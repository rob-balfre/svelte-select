import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VARIABLE_USAGE_PATTERN = 'var\\(--([A-Za-z\\-_]*)';
const VARIABLE_USAGE_REGEX = /var\(--([A-Za-z\-_]*)/g;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SOURCE_FOLDER = path.join(__dirname, '..', 'src/lib');

const DOC_FILE_PATH = path.join(__dirname, 'theming_variables.md');
const VARIABLE_SECTION_PATTERN = /(<!-- List start -->)[\s\S]*(<!-- List end -->)/m;

function getSvelteFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries.map((entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            return getSvelteFiles(fullPath);
        }
        return entry.name.endsWith('.svelte') ? [fullPath] : [];
    });

    return files.flat();
}

const svelteFiles = getSvelteFiles(SOURCE_FOLDER);
const searchResults = svelteFiles.map((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    return [...content.matchAll(VARIABLE_USAGE_REGEX)].map((match) => match[0]);
});
const justTheMatchedParts = searchResults.flat();
const uniqueMatches = [...new Set(justTheMatchedParts).values()];
uniqueMatches.sort();
const matchesAsMarkdownListItems = uniqueMatches.map((b) => b.replace(/var\((--[A-Za-z\-_]*)/, '- `$1`'));

const oldContent = fs.readFileSync(DOC_FILE_PATH, 'utf8');
const line_ending = oldContent.includes('\r\n') ? '\r\n' : '\n';
const oldFileDoesNotContainSection = oldContent.search(VARIABLE_SECTION_PATTERN) === -1;
if (oldFileDoesNotContainSection) {
    console.error(`Could not find variable section in ${DOC_FILE_PATH}: ${oldContent}`);
    process.exit(1);
}

const replacement_section = ['<!-- List start -->', ...matchesAsMarkdownListItems, '<!-- List end -->'].join(
    line_ending,
);

fs.writeFileSync(DOC_FILE_PATH, oldContent.replace(VARIABLE_SECTION_PATTERN, replacement_section));
console.log(`Successfully wrote to ${DOC_FILE_PATH}`);
