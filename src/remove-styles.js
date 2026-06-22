import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const USAGE_PATTERN = /((.|\n)*)(?=<style)/;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SOURCE_FOLDER = path.join(__dirname, 'lib');
const TARGET_FOLDER = path.join(__dirname, 'lib/no-styles');

mkdirSync(TARGET_FOLDER, { recursive: true });

readdirSync(SOURCE_FOLDER, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svelte'))
    .forEach((entry) => {
        const fileName = entry.name;
        const filePath = path.join(SOURCE_FOLDER, fileName);
        const source = readFileSync(filePath, 'utf8');
        const match = source.match(USAGE_PATTERN);
        if (!match?.[0]) {
            return;
        }

        let output = match[0];
        if (fileName === 'Select.svelte') {
            output = output.replace('./filter', '../filter');
            output = output.replace('./get-items', '../get-items');
        }

        writeFileSync(path.join(TARGET_FOLDER, fileName), output);
    });
