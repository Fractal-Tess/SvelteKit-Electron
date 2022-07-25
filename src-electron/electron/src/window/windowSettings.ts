import type { BrowserWindow } from 'electron';
import type { Position, Size } from '../types';
import { store } from '../store/store';

/**
 * Saves the window's size and position
 * @param window
 */
export const manageWindow = (window: BrowserWindow) => {
  window.on('resize', () => {
    const [width, height] = window.getSize();
    store.set('win-size', { height, width } as Size);
  });
  window.on('move', () => {
    const [x, y] = window.getPosition();
    store.set('win-pos', { x, y } as Position);
  });
};

/**
 * @param `h` Default height of the window
 * @param `w` Default width of the window
 */
export const getWindowParams = (h: number, w: number) => {
  const size = (store.get('win-size') as Size | undefined) ?? {
    height: h,
    width: w
  };
  const pos = (store.get('win-pos') as Position | undefined) ?? {};
  return { ...size, ...pos };
};
