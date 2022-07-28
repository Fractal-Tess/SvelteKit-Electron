#!/usr/bin/env node
import { build } from 'vite';
import { copyRecursiveSync } from './util.js';
import { rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mode = 'production';

// Clear the build directory
rmSync(join(__dirname, '../build'), { recursive: true, force: true });

/** @param {import('vite').ViteDevServer} */
const buildElectron = () => {
  return build({
    mode,
    configFile: 'src-electron/electron/vite.config.js',
    plugins: [
      {
        name: 'VITE-PROD-electron-builder'
      }
    ]
  });
};

/** @param {import('vite').ViteDevServer} */
const buildPreload = () => {
  return build({
    mode,
    configFile: 'src-electron/preload/vite.config.js',
    plugins: [
      {
        name: 'VITE-PROD-preload-builder'
      }
    ]
  });
};

/** @param {import('vite').ViteDevServer} */
const buildSvelteKit = () => {
  return build({
    mode,
    configFile: 'vite.config.js',
    plugins: [
      {
        name: 'VITE-PROD-sveltekit-builder'
      }
    ]
  });
};

(async () => {
  /**
   * Copy over the asset files
   */
  copyRecursiveSync('src-electron/electron/assets', 'build/assets');

  await Promise.all([buildElectron(), buildPreload()]);

  await buildSvelteKit(); // Build sveltekit call process.exit, so it has to be the last thing to be executed.
})();
