import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import * as Octokit from '@octokit/rest';

const octokit = new Octokit();

export type Organizations = Array<{
  name: string;
  uri: string;
  uid: number;
}>;

export type Author = {
  id: number;
  name: string;
  avatar_url: string;
  html_url: string;
  blog: string;
};

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

  type Author {
    id: Int!
    name: String!
    avatar_url: String!
    html_url: String
    blog: String!
  }

  type Query {
    organizations: [Organization]
    organization(name: String!): Organization
    author: Author
  }
`;

export const resolvers: IResolvers = {
  Query: {
    organizations: () => organizations,
    organization: (obj, { name }) => organizations.find((o) => o.name === name),
    author: () => octokit.users.getForUser({ username: 'hiroppy' }).then(({ data }) => data)
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
