import {TodoApplication} from './application';
import {RestServer} from '@loopback/rest';
import {ApplicationConfig} from '@loopback/core';

export {TodoApplication};

export async function main(options?: ApplicationConfig) {
  const app = new TodoApplication();

  try {
    await app.start();
    const server = await app.getServer(RestServer);
    const port = await server.get('rest.port');
    console.log(`Server is running at http://127.0.0.1:${port}`);
  } catch (err) {
    console.error(`Unable to start application: ${err}`);
  }
  return app;
}
