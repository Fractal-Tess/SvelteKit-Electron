import { BrowserWindow } from 'electron';
import { join } from 'node:path';
import * as windowSettings from './windowSettings';

let window: BrowserWindow | null = null;

export const createWindow = async (): Promise<BrowserWindow> => {
  const window = new BrowserWindow({
    ...windowSettings.getWindowParams(800, 600),
    show: false, //  Hide during window loading - causes flickering and window issues.
    transparent: true,
    frame: false,
    icon: join(__dirname, '../assets/app-icon.png'),
    webPreferences: {
      webviewTag: false, // This tag is not recommended for use.
      preload: join(__dirname, '../preload/index.cjs')
    }
  });

  /**
   * Manage the state of the window,
   * such as size/shape and position
   */
  windowSettings.manageWindow(window);

  if (import.meta.env.DEV) window.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  else window.loadURL(process.env.PROD_INTERNAL_SVELTEKIT_SERVER!); // This is set by tge sk-server.ts

  /**
   *  Show the window once everything has loaded.
   */
  window.on('ready-to-show', window.show);

  return window;
};

/**
 *  Restore existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  // let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (!window) window = await createWindow();
  if (window.isMinimized()) window.restore();
  window.focus();
}
