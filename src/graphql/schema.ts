import { makeExecutableSchema } from 'graphql-tools';

export const organizations = [
  {
    name: 'nodejs',
    uri: 'https://github.com/nodejs',
    uid: 1
  },
  {
    name: 'facebook',
    uri: 'https://github.com/facebook',
    uid: 2
  },
  {
    name: 'google',
    uri: 'https://github.com/google',
    uid: 3
  },
  {
    name: 'microsoft',
    uri: 'https://github.com/microsoft',
    uid: 4
  }
];

export const typeDefs = `
  type Organization {
    name: String!,
    uri: String!,
    uid: Int!
  }

  type Query {
    organization(name: String): Organization
    organizations: [Organization]
  }
`;

export const resolvers = {
  Query: { organizations: () => organizations }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
