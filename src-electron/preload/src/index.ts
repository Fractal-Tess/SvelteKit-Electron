import { contextBridge, ipcRenderer } from 'electron';
import { type Theme } from './types';
import { type BinaryLike, createHash } from 'crypto';
import { store } from '../../electron/src/store';

/**
 * The properties of the API object will be exposed to the renderer process.
 * Inside of the renderer, you are able to call/access these properties by using the global api object.
 */
export const API = {
  example: () => 'Hello from Electron',
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    all: () => process.versions
  },
  theme: {
    get: () => store.get('theme'),
    set: (theme: Theme) => store.set('theme', theme)
  },
  sha256sum: (data: BinaryLike) =>
    createHash('sha256').update(data).digest('hex'),
  minimize: () => ipcRenderer.send('minimize')
};

contextBridge.exposeInMainWorld('api', API);
