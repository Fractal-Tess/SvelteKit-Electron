import { chrome } from '../../.electron-vendors.cache.json';
import { join } from 'node:path';

/** @type {import('vite').UserConfig} */
const config = {
  mode: process.env.MODE,
  root: __dirname,
  envDir: join(__dirname, '../../'),
  build: {
    ssr: true,
    sourcemap: 'inline',
    target: `chrome${chrome}`,
    outDir: '../../build/preload',
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
    reportCompressedSize: false
  }
};

export default config;
