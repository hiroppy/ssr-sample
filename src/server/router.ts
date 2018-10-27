import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as health from './controllers/health';
import * as renderer from './controllers/renderer';
import { resolvers, schema } from '../graphql/schema';
import { endpoint } from '../graphql/constants';

const apollo = new ApolloServer({
  schema,
  resolvers,
  playground:
    process.env.NODE_ENV !== 'production'
      ? {
          endpoint
        }
      : false
});

export function router(app: express.Application) {
  apollo.applyMiddleware({ app, path: endpoint });

  app.use('/favicon.ico', (req, res) => res.status(200).send());
  app.use('/public', express.static('dist'));
  app.get('/api/health', health.get);
  app.get('*', renderer.get);
}
