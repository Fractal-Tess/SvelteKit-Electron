import {
  existsSync,
  statSync,
  mkdirSync,
  copyFileSync,
  readdirSync
} from 'node:fs';
import { join } from 'node:path';

/**
 * @param {string} src  The source path to copy as a base.
 * @param {string} dest The destination path as a base.
 */

export const copyRecursiveSync = (src, dest) => {
  if (existsSync(src) && statSync(src).isDirectory()) {
    if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
    readdirSync(src).forEach(e => {
      copyRecursiveSync(join(src, e), join(dest, e));
    });
  } else {
    copyFileSync(src, dest);
  }
};
