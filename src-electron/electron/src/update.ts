import { logger } from './logger';

export const update = async () => {
  logger.info('%cChecking for updates', 'color:green');

  // Check for application updates in production
  const { autoUpdater } = await import('electron-updater');
  try {
    autoUpdater.checkForUpdatesAndNotify();
  } catch (e) {
    logger.error(`Something went wrong with electron-updater: ${e}`);
  }
};
