import { app, BrowserWindow } from 'electron';
import logger from './logger/logger';
import { startSvelteKitServer } from './sk-server/server';
import { restoreOrCreateWindow } from './window/mainWindow';

export const getPort = () => {
  const port = process.env.PORT;
  if (!port) return 29890;
  return +port;
};
const isDev = import.meta.env.DEV;

/** Handle creating/removing shortcuts on Windows when installing/uninstalling. */
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

/** Prevent multiple instances of the application. */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) app.quit();

/** Disable Hardware Acceleration for more power-save. */
// app.disableHardwareAcceleration();

/** Shut down the process if all windows are closed. */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/** Initialize and start the application window.*/
app.on('activate', restoreOrCreateWindow);

/** Create app window when background process will be ready. */
app.once('ready', async () => {
  if (!isDev) {
    startSvelteKitServer();
  }
  restoreOrCreateWindow();
});

/** Check for new app versions in production mode only. */
// if (import.meta.env.PROD) {
//   app
//     .whenReady()
//     .then(() => import('electron-updater'))
//     .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
//     .catch(e => logger.error('Failed check updates:', e));
// }
