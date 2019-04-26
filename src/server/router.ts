import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as health from './controllers/health';
import * as renderer from './controllers/renderer';
import { resolvers, schema } from '../graphql/schema';
import { endpoint } from '../graphql/constants';

const apollo = new ApolloServer({
  debug: process.env.NODE_ENV !== 'production',
  schema,
  resolvers,
  playground:
    process.env.NODE_ENV !== 'production'
      ? {
          endpoint
        }
      : false,
  // logging
  // wait for https://github.com/apollographql/apollo-server/pull/1748
  formatError: (err) => {
    // console.log(JSON.stringify(err, null, 2));
    return err;
  },
  formatResponse: (res: { data: any }) => {
    // console.log(JSON.stringify(res.data, null, 2));
    return res;
  }
});

export function router(app: express.Application) {
  apollo.applyMiddleware({ app, path: endpoint });

  app.use('/favicon.ico', (req, res) => res.status(200).send());
  app.use('/public', express.static('dist/client'));
  app.get('/api/health', health.get);
  app.get('*', renderer.get);
}
