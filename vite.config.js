import { sveltekit } from '@sveltejs/kit/vite';
import { join } from 'node:path';

/** @type {import('vite').UserConfig} */

const config = {
  plugins: [sveltekit()],

  resolve: {
    alias: {
      $styles: join(__dirname, 'src/styles')
    }
  },
  build: {
    reportCompressedSize: false
  },
  server: {
    port: +(process.env.PORT || 3000),
    host: '127.0.0.1',
    strictPort: true
  }
};

export default config;
