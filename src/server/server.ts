/* eslint @typescript-eslint/no-var-requires: 0 */

import { createServer } from 'http';
import express from 'express';
import * as bodyParser from 'body-parser';
import compression from 'compression';
import { generateNonceId, csp } from './csp';
import { apollo } from './apollo';
import { router } from './router';

export function runServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // CSP
  app.use(generateNonceId);
  app.use(csp);

  // compression
  app.use(compression({ level: 5 }));

  // HMR
  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require('../../webpack.client.config');
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        writeToDisk(filePath: string) {
          return /loadable-stats/.test(filePath);
        }
      })
    );
  }

  // setup apollo
  apollo(app);

  // register routes
  router(app);

  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'test') {
    const server = createServer(app);

    server.listen(port, () => {
      console.log(`Listening on ${port}`);
    });

    // https://stackoverflow.com/a/48710483/7014700
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.syscall !== 'listen') throw err;

      const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

      switch (err.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw err;
      }
    });
  }

  return app;
}
