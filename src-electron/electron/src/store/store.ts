import ElectronStore from 'electron-store';
import { Store } from '../types';

const defaults = {
  'win-size': {
    width: 800,
    height: 600
  },
  theme: 'dark'
} as const;

export const store = new ElectronStore<Store>({
  defaults
});
