import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

writeFileSync(
  join(__dirname, '../build/package.json'),
  JSON.stringify({ module: 'commonjs' })
);

console.log(
  'Added package.json file to the build directory of electron -> specify folder as cjs'
);
