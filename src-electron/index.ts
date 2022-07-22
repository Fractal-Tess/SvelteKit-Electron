import { app, BrowserWindow } from 'electron';
import { startSvelteKitServer } from './server';
import * as windowState from './windowState';
import { getPort } from './util';
import { join } from 'path';
import waitOn from 'wait-on';

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

const createMainWidnow = (): void => {
  mainWindow = new BrowserWindow({
    ...windowState.getWindowParams(800, 600),
    show: false,
    transparent: true,
    frame: false,
    icon: join(__dirname, './svelte/client/favicon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, './preload.js'),
      // Remove devtools in prod
      devTools: isDev
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
};

app.on('ready', async () => {
  if (!isDev) await startSvelteKitServer(PORT);
  const server = `http-get://localhost:29890`;
  // const server = 'https://youtube.com';
  // await waitOn({ resources: [server] }, () => 0);
  await waitOn({ resources: [server], verbose: true }, () => null);
  console.log('Local server has started, running window creation');
  createMainWidnow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0 || mainWindow === null) {
    createMainWidnow();
  }
});
