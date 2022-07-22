import { contextBridge } from 'electron';
import { Theme } from './types';
import { store } from './store';

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

export const API = {
  // Example
  example: () => 'Hello from Electron',
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
  },
  theme: {
    get: () => store.get('theme'),
    set: (theme: Theme) => store.set('theme', theme)
  }
};

contextBridge.exposeInMainWorld('api', API);
