import { app } from 'electron';
import { restoreOrCreateWindow } from './window/mainWindow';
import { logger } from './logger';
import { update } from './update';
import { startSvelteKitServer } from './sk-server';
import { applySecurityRestrictions } from './security';

/**
 * Handle creating/removing shortcuts on Windows when installing/uninstalling.
 */
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

(async () => {
  if (import.meta.env.PROD) {
    await update();
    await startSvelteKitServer();
  }
})();

/**
 * Apply security restriction
 */
applySecurityRestrictions();

/**
 * Prevent electron from running multiple instances.
 */
if (!app.requestSingleInstanceLock()) app.quit();

/**
 * Disable Hardware Acceleration to save more system resources.
 */
// app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('quit', () => {
  import.meta.env.DEV && logger.info('The application was closed');
});

/**
 * macOs specific event for starting the application
 */
app.on('activate', restoreOrCreateWindow);

/**
 * Create the application window when the background process is ready.
 */
app.once('ready', restoreOrCreateWindow);
