import { app, BrowserWindow } from 'electron';
import { startSvelteKitServer } from './server';
import * as windowState from './windowState';
import { getPort } from './util';
import { join } from 'path';
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const PORT = getPort();
const isDev = !app.isPackaged;
let mainWindow: BrowserWindow | null = null;

const createWindow = (): BrowserWindow => {
  mainWindow = new BrowserWindow({
    ...windowState.getWindowParams(800, 600),
    show: false,
    transparent: true,
    frame: false,
    icon: join(__dirname, './svelte/client/favicon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, './preload.js')
    }
  });

  windowState.manageWindow(mainWindow);

  mainWindow.loadURL(`http://localhost:${PORT}`);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Development settings
  if (isDev) {
    // Open devtools on window show
    // mainWindow.webContents.openDevTools();
    //*
    // Set always on top on window show
    // For some reason doesn't work on arch
    // mainWindow.setAlwaysOnTop(true);
  }

  return mainWindow;
};

app.on('ready', async () => {
  if (!isDev) await startSvelteKitServer(PORT);
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0 || mainWindow === null) {
    createWindow();
  }
});
