import { BrowserWindow } from 'electron';
import { join } from 'node:path';
import * as windowSettings from './windowSettings';

let window: BrowserWindow | null = null;

export const createWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    ...windowSettings.getWindowParams(800, 600),
    show: false /**  Hide the window to prevent flickering. */,
    transparent: true,
    frame: false,
    icon: join(__dirname, '../../static/favicon.png'),
    webPreferences: {
      webviewTag: false, // TODO: Explore this
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, '../preload/index.cjs')
    }
  });

  windowSettings.manageWindow(window);

  window.loadURL('http://127.0.0.1:29890');

  /** Show the window once everything has loaded. */
  window.on('ready-to-show', window.show);

  return window;
};

/** Restore existing BrowserWindow or Create a new BrowserWindow. */
export async function restoreOrCreateWindow() {
  /** let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed()); */

  if (!window) window = await createWindow();
  if (window.isMinimized()) window.restore();
  window.focus();
}
