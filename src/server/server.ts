import { createServer } from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Loadable from 'react-loadable';
import { router } from './router';

export function runServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // HMR
  if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require('../../webpack.config');
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
      })
    );
  }

  // register routes
  router(app);

  const server = createServer(app);

  Loadable.preloadAll().then(() => {
    server.listen(port);
  });

  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

    console.log(`Listening on ${bind}`);
  });

  server.on('error', (err: any) => {
    if (err.syscall !== 'listen') throw err;

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
      default:
        throw err;
    }
  });
}
