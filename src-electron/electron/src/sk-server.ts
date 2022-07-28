import polka, { type Middleware } from 'polka';
import type { AddressInfo } from 'node:net';
import { join } from 'node:path';
import { logger } from './logger';
import { app } from 'electron';
// import serve from 'serve-static';

/**
 * Starts the SvelteKit server on localhost for electron to load
 */
export const startSvelteKitServer = async () => {
  logger.info('%cStarting SvelteKit Server', 'color:green');

  const handlerPath = join(__dirname, '../svelte/handler.cjs');

  const handler = (await import(handlerPath)).handler as Middleware;
  const polkaInstance = polka()
    // .use(serve(client))
    .use(handler)
    .listen({ port: 0, hostName: '127.0.0.1' }, () =>
      logger.info(
        `%cSvelteKit %cserver running on %chttp://127.0.0.1:29890`,
        'color:red',
        'color:magenta',
        'color:blue'
      )
    );

  if (!polkaInstance.server) {
    logger.warn(
      "%cThe server object from polka's server instance is null/undefined",
      'color:red'
    );
    app.quit();
    process.exit(1);
  }
  process.env.PROD_INTERNAL_SVELTEKIT_SERVER = `http://localhost:${
    (polkaInstance.server.address() as AddressInfo).port
  }`;
};
