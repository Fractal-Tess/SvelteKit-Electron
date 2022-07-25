import { build } from 'vite';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.chdir(join(__dirname, '../../'));
build();
