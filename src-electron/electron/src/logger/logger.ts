import { app } from 'electron';
import * as log from 'electron-log';

const isDev = !app.isPackaged;
const logger = log;

if (isDev) logger.transports.file.getFile().clear();

logger.transports.file.level = isDev ? 'silly' : 'info';
logger.transports.console.level = isDev ? 'silly' : false;

export default logger;

export {};
