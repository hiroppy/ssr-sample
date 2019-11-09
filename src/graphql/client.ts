import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-boost';

// link is an argument because schema.ts used by SchemaLink uses `fs` module
export function createClient({ link }: { link: ApolloLink }) {
  return new ApolloClient({
    ssrMode: !process.env.IS_BROWSER,
    link,
    cache: process.env.IS_BROWSER
      ? new InMemoryCache().restore((window as any).__APOLLO_STATE__)
      : new InMemoryCache()
  });
}
