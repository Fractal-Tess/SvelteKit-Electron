import { join, dirname } from 'node:path';
import { existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildPath = join(__dirname, '../build');
if (existsSync(buildPath))
  rmSync(join(__dirname, '../build'), {
    recursive: true,
    force: true
  });

console.log('Cleared build directory at: ', buildPath);
