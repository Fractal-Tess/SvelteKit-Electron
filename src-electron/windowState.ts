import type { BrowserWindow } from 'electron';
import type { Position, Size } from './types.js';
import { store } from './store';

/**
 * Saves the window's size and position
 * @param window
 */
export const manageWindow = (window: BrowserWindow) => {
  window.on('resize', () => {
    const [width, height] = window.getSize();
    const size: Size = {
      height,
      width
    };
    store.set('win-size', size);
  });
  window.on('move', () => {
    const [x, y] = window.getPosition();
    const pos: Position = {
      x,
      y
    };
    store.set('win-pos', pos);
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
