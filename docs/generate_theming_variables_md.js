const fs = require("fs");
const path = require("path");

const { find } = require("find-in-files");

const VARIABLE_USAGE_PATTERN = "var\\(--([A-Za-z\\-_]*)";
const SOURCE_FOLDER = path.join(__dirname, "..", "src");

const DOC_FILE_PATH = path.join(__dirname, "theming_variables.md");
const VARIABLE_SECTION_PATTERN = /(<!-- List start -->)(.|\n)*(<!-- List end -->)/gm;

(async () => {
  const searchResults = await find(
    VARIABLE_USAGE_PATTERN,
    SOURCE_FOLDER,
    ".svelte$"
  );
  const justTheMatchedParts = Object.keys(searchResults).reduce(
    (accumulator, nextKey) => [
      ...accumulator,
      ...searchResults[nextKey].matches
    ],
    []
  );
  const uniqueMatches = [...new Set(justTheMatchedParts).values()];
  uniqueMatches.sort();
  const matchesAsMarkdownListItems = uniqueMatches.map(b =>
    b.replace(/var\((--[A-Za-z\-_]*)/, "- `$1`")
  );

  const START_TAG_CAPTURE_GROUP = "$1";
  const END_TAG_CAPTURE_GROUP = "$3";
  const newDependencySectionAsRegexReplaceExpression = [
    START_TAG_CAPTURE_GROUP,
    ...matchesAsMarkdownListItems,
    END_TAG_CAPTURE_GROUP
  ].join("\n");
  const oldContent = fs.readFileSync(DOC_FILE_PATH).toString();
  const oldFileDoesNotContainSection =
    oldContent.search(VARIABLE_SECTION_PATTERN) === -1;
  if (oldFileDoesNotContainSection) {
    console.error(`Could not find variable section in ${DOC_FILE_PATH}`);
    process.exit(1);
  }
  fs.writeFileSync(
    DOC_FILE_PATH,
    oldContent.replace(
      VARIABLE_SECTION_PATTERN,
      newDependencySectionAsRegexReplaceExpression
    )
  );
  console.log(`Successfully wrote to ${DOC_FILE_PATH}`);
})();
