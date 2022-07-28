import ElectronStore from 'electron-store';
import { Store } from './types';

const defaults = {
  'win-size': {
    width: 800,
    height: 600
  },
  theme: 'light'
} as const;

export const store = new ElectronStore<Store>({
  defaults
});
