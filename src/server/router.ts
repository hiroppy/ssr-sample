import * as express from 'express';
import * as health from './controllers/health';
import * as renderer from './controllers/renderer';

export function router(app: express.Application) {
  app.use('/public', express.static('dist'));
  app.use('/api/heath', health.get);
  app.use('/', renderer.get);
}
