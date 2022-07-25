#!/usr/bin/env node

import { createServer, build, createLogger } from 'vite';
import electronPath from 'electron';
import { spawn } from 'child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.chdir(join(__dirname, '../../'));

const mode = process.env.MODE || 'development';

/** @type {import('vite').LogLevel} */
const logLevel = 'info';

/** @param {import('vite').ViteDevServer} watchServer Renderer watch server instance. */
const setupElectronWatcher = ({ resolvedUrls }) => {
  process.env.VITE_DEV_SERVER_URL = resolvedUrls.local[0];

  const logger = createLogger(logLevel, {
    prefix: '[Electron]'
  });

  let electronProcess = null;

  return build({
    mode,
    logLevel,
    build: {
      watch: {}
    },
    configFile: 'src-electron/electron/vite.config.js',
    plugins: [
      {
        name: 'reload-electron-on-change',
        writeBundle() {
          if (electronProcess) {
            electronProcess.off('exit', process.exit);
            electronProcess.kill('SIGINT');
            electronProcess = null;
          }

          electronProcess = spawn(String(electronPath), ['.']);

          electronProcess.stdout.on('data', msg =>
            logger.info(msg.toString().trim(), { timestamp: true })
          );

          electronProcess.stderr.on('data', msg =>
            logger.error(msg.toString().trim(), { timestamp: true })
          );

          electronProcess.on('exit', () => {
            logger.info('The application has been closed => Stopping watcher');
            process.exit(0);
          });
        }
      }
    ]
  });
};

/** @param {import('vite').ViteDevServer} watchServer Renderer watch server instance. */
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
