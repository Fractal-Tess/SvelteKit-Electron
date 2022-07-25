import { join } from 'path';
import polka from 'polka';
import logger from '../logger/logger';
// import serve from 'serve-static';

let isRunning = false;

/** Starts the SvelteKit server on localhost for electron to load */
export const startSvelteKitServer = async () => {
  /** Guard multiple calls */
  if (isRunning) return;
  isRunning = true;

  const handlerPath = join(__dirname, '../svelte/handler.cjs');
  // If losing functionality, try exposing the client directory

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { handler } = await import(handlerPath);
  polka()
    // .use(serve(client))
    .use(handler)
    .listen(3000, () =>
      logger.info(
        `%cSvelteKit %cserver running on %c${3000}`,
        'color:red',
        'color:magenta',
        'color:blue'
      )
    );
};
