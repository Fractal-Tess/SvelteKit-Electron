/* eslint-disable no-constant-condition */
import { sveltekit } from '@sveltejs/kit/vite';
import { build } from 'esbuild';
import { join } from 'node:path';
import { existsSync, rmSync } from 'node:fs';

/** @type {import('vite').UserConfig} */

rmSync(join(__dirname, '/build/svelte'), { force: true, recursive: true });
const config = {
  plugins: [
    sveltekit(),
    {
      name: 'convert-handler-to-cjs',
      apply: 'build',
      enforce: 'pre',
      closeBundle: () => {
        console.log(
          existsSync(join(__dirname, 'build/svelte'))
            ? `Folder svelte is present at the expected build dir`
            : 'Folder svelte is missing from expected build dir'
        );
      }
    }
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${join(
          __dirname,
          '/src/styles/variables.scss'
        )}" as *;`
      }
    }
  },

  resolve: {
    alias: {
      $styles: join(__dirname, 'src/styles')
    }
  },
  server: {
    port: +(process.env.PORT || 29890),
    host: '127.0.0.1',
    strictPort: true
  }
};

export default config;
