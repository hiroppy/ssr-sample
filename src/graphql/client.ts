import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { SchemaLink } from 'apollo-link-schema';
import { schema } from './schema';
import { endpoint } from './constants';

export function createClient() {
  return new ApolloClient({
    ssrMode: !process.env.IS_BROWSER,
    link: process.env.IS_BROWSER ? new HttpLink({ uri: endpoint }) : new SchemaLink({ schema }),
    cache: process.env.IS_BROWSER
      ? new InMemoryCache().restore(window.__APOLLO_STATE__)
      : new InMemoryCache()
  });
}
