import ElectronStore from 'electron-store';

import type { Store } from './types.js';

export const store = new ElectronStore<Store>({
  defaults: {
    'win-size': {
      width: 800,
      height: 600
    },
    theme: 'dark'
  }
});
