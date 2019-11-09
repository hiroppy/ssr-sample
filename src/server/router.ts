import * as express from 'express';
import * as health from './controllers/health';
import * as renderer from './controllers/renderer';
import * as saga from './controllers/saga';

export function router(app: express.Application) {
  app.use('/favicon.ico', (req, res) => res.status(200).send());
  app.use('/robots.txt', express.static('dist/client/robots.txt'));

  // for PWA
  app.use('/service-worker.js', express.static('dist/client/service-worker.js'));
  app.use('/manifest.webmanifest', express.static('dist/client/manifest.webmanifest'));

  app.use('/public', express.static('dist/client'));

  app.get('/api/health', health.get);

  // rest
  app.get('/api/saga', saga.getAll);
  app.post('/api/saga/:id', saga.post);

  // graphql
  app.get('/api/apollo', health.get);

  app.get('*', renderer.get);
}
