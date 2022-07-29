import { BrowserWindow, ipcMain } from 'electron';

export const registerIPC = () => {
  ipcMain.on('minimize', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (!win) return;
    win.isMinimized() ? win.restore() : win.minimize();
  });
};
