import { build } from 'esbuild';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

build({
  entryPoints: [join(__dirname, '../../build/svelte/handler.js')],
  outfile: join(__dirname, '../../build/svelte/handler.cjs'),
  platform: 'node',
  format: 'cjs',
  bundle: true,
  define: {
    'import.meta.url': 'importMetaUrl'
  },

  inject: [join(__dirname, './shims.js')]
});

console.log('Converted handler to proper commonjs format');
