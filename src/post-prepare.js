import { rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

rmSync(path.join(__dirname, '/lib/no-styles/'), { recursive: true, force: true });
