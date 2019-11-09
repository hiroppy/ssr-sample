import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { getComplexity, simpleEstimator, fieldExtensionsEstimator } from 'graphql-query-complexity';
import { separateOperations } from 'graphql';
import { resolvers, schema } from '../graphql/schema';
import { endpoint, limitCost } from '../graphql/constants';

export function apollo(app: express.Application) {
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
    plugins: [
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              query: request.operationName
                ? separateOperations(document)[request.operationName]
                : document,
              variables: request.variables,
              estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })]
            });

            if (complexity >= limitCost) {
              throw new Error(`${complexity} is over ${limitCost}`);
            }
            console.log('Used query complexity points:', complexity);
          },
          didEncounterErrors({ errors, request }) {
            // e.g. add a logger
            console.error(errors);
            console.error(request);
          }
        })
      }
    ]
  });

  apollo.applyMiddleware({ app, path: endpoint });
}
