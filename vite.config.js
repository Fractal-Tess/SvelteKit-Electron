import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/styles/variables.scss" as *;'
      }
    }
  },
  resolve: {
    alias: {
      $styles: path.resolve('./src/styles'),
      $lib: path.resolve('./src/lib'),
      $src: path.resolve('./src/')
    }
  },
  server: { port: process.env.PORT || 29890 }
};

export default config;
