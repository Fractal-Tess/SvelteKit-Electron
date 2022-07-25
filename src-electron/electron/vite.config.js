import { node } from '../../.electron-vendors.cache.json';
import { join } from 'path';

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
const config = {
  mode: process.env.MODE,
  root: __dirname,
  envDir: join(__dirname, '../../'),
  build: {
    ssr: true,
    sourcemap: 'inline',
    target: `node${node}`,
    outDir: '../../build/electron',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs']
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].cjs'
      }
    },
    emptyOutDir: true,
    reportCompressedSize: true
  }
};

export default config;
