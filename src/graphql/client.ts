import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { SchemaLink } from 'apollo-link-schema';
import { schema } from './schema';

export const client = new ApolloClient({
  ssrMode: !process.env.IS_BROWSER,
  link: new SchemaLink({ schema }),
  cache: process.env.IS_BROWSER
    ? new InMemoryCache().restore((window as any).__APOLLO_STATE__)
    : new InMemoryCache()
});
