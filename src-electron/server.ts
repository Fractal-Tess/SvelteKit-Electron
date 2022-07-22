import { existsSync } from 'fs';
import { join } from 'path';
import { app } from 'electron';
import serve from 'serve-static';
import polka from 'polka';
import logger from './logger';

let isRunning = false;

/**
 * Starts the SvelteKit server on localhost for electron to load
 * @param PORT The port to use for the server listener
 */
export const startSvelteKitServer = async (PORT: number) => {
  // Guard multiple calls
  if (isRunning) return;
  isRunning = true;

  const handlerPath = checkPath('./svelte/handler.cjs');
  // const clientPath = checkPath('./svelte/client');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { handler } = await import(handlerPath);
  const sourcePath = `${join(__dirname, './')}`;
  console.log(sourcePath);
  polka()
    // .use(serve(clientPath))
    .use(serve(sourcePath))
    .use(handler)

    .listen(PORT, () =>
      logger.info(
        `%cSvelteKit %cserver running on %chttp://localhost:${PORT}`,
        'color:red',
        'color:magenta',
        'color:blue'
      )
    );
};

/**
 * Takes a relative path and returns an absolute one while also checking if the path exists
 * Terminates the electron application by calling `app.quit()` whenever a path is invalid
 * @param path The absolute path to the file
 */
const checkPath = (path: string, errMsg?: string) => {
  const aPath = join(__dirname, path);
  if (!existsSync(aPath)) {
    logger.error(errMsg ?? `A path was not found ${aPath}`);
    app.quit();
  }
  return aPath;
};
