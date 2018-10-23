import { makeExecutableSchema, IResolvers } from 'graphql-tools';

export type Organizations = Array<{
  name: string;
  uri: string;
  uid: number;
}>;

export const organizations: Organizations = [
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
    organizations: [Organization]
    organization(name: String!): Organization
  }
`;

export const resolvers: IResolvers = {
  Query: {
    organizations: () => organizations,
    organization: (obj, { name }) => organizations.find((o) => o.name === name)
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
