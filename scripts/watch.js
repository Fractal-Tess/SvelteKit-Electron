#!/usr/bin/env node

import { createServer, build, createLogger } from 'vite';
import electronPath from 'electron';
import { spawn } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const mode = process.env.MODE || 'development';

/** @type {import('vite').LogLevel} */
const logLevel = 'info';

/** @param {import('vite').ViteDevServer} watchServer */
const setupElectronWatcher = ({ resolvedUrls }) => {
  process.env.VITE_DEV_SERVER_URL = resolvedUrls.local[0];

  const logger = createLogger(logLevel, {
    prefix: '[Electron]:'
  });

  let electronProcess = null;

  return build({
    mode,
    logLevel,
    build: {
      /**
       * Watch the directory where the config file is located for any source code changes.
       * Whenever there is a change, the writeBundle function will be invoked,
       * the current electron process will be terminated and a new one will be spawned.
       */
      watch: {}
    },
    configFile: 'src-electron/electron/vite.config.js',
    plugins: [
      {
        name: 'reload-electron-on-change',

        writeBundle() {
          /**
           * Create the directory and copy over any files required for the background electron process.
           */
          if (!existsSync('build/assets'))
            mkdirSync('build/assets', { recursive: true });

          copyFileSync(
            'src-electron/electron/assets/icons/app-icon.png',
            'build/assets/app-icon.png'
          );

          /**
           * Kill lingering electron process
           */
          if (electronProcess) {
            electronProcess.off('exit', process.exit);
            electronProcess.kill('SIGINT');
            electronProcess = null;
          }

          /**
           * Start electron dev via the `electron .` command
           */
          electronProcess = spawn(String(electronPath), ['.']);

          /**
           * Proxy stdout and stderr to the console
           */
          electronProcess.stdout.on('data', msg =>
            logger.info(msg.toString().trim(), { timestamp: true })
          );
          electronProcess.stderr.on('data', msg =>
            logger.error(msg.toString().trim(), { timestamp: true })
          );

          /**
           * When the application has been closed, exit out of the watcher script
           */
          electronProcess.on('exit', process.exit);
        }
      }
    ]
  });
};

/** @param {import('vite').ViteDevServer} watchServer */
const setupPreloadWatcher = ({ ws }) => {
  return build({
    mode,
    logLevel,
    build: {
      watch: {}
    },
    configFile: 'src-electron/preload/vite.config.js',
    plugins: [
      {
        name: 'reload-preload-script',
        writeBundle() {
          ws.send({
            type: 'full-reload'
          });
        }
      }
    ]
  });
};

(async () => {
  try {
    const viteSvelteKitServer = await createServer({
      mode,
      logLevel,
      configFile: 'vite.config.js'
    });

    await viteSvelteKitServer.listen();

    await setupPreloadWatcher(viteSvelteKitServer);

    await setupElectronWatcher(viteSvelteKitServer);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
