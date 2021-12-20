const { writeFile, mkdir } = require('fs/promises');
const path = require("path");
const { find } = require("find-in-files");

const USAGE_PATTERN = /((.|\n)*)(?=<style)/;
const SOURCE_FOLDER = path.join(__dirname, 'lib');

(async () => {
    const searchResults = await find(USAGE_PATTERN, SOURCE_FOLDER, '.svelte$');

    let promises = [mkdir(path.join(__dirname, '/lib/no-styles'), { recursive: true })];

    Object.keys(searchResults).forEach((key) => {
        let fileName = key.split('/').pop();
        promises.push(writeFile(path.join(__dirname, '/lib/no-styles', fileName), searchResults[key].matches[0]));
    });

    const all = await Promise.all(promises);
})();
