import { contextBridge } from 'electron';
import { Theme } from './types';
import { store } from '../../electron/src/store/store';
import { type BinaryLike, createHash } from 'crypto';

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

export const API = {
  // Example
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
    createHash('sha256').update(data).digest('hex')
};

contextBridge.exposeInMainWorld('api', API);
