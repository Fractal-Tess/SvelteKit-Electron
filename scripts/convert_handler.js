import { build as esBuild } from 'esbuild';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

await esBuild({
  entryPoints: ['build/svelte/handler.js'],
  outfile: 'build/svelte/handler.cjs',
  platform: 'node',
  format: 'cjs',
  bundle: true,
  define: {
    'import.meta.url': 'importMetaUrl'
  },

  inject: [join(__dirname, './shims.js')]
});
