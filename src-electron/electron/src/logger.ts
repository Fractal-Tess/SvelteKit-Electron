import * as log from 'electron-log';

export const logger = log;

if (import.meta.env.DEV) logger.transports.file.getFile().clear();

logger.transports.file.level = import.meta.env.DEV ? 'silly' : 'info';
logger.transports.console.level = import.meta.env.DEV ? 'silly' : false;
