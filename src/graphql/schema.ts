import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import * as Octokit from '@octokit/rest';

const octokit = new Octokit();

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

export type Author = {
  id: number;
  name: string;
  avatar_url: string;
  html_url: string;
  blog: string;
};

export const typeDefs = `
  type Organization {
    name: String!
    uri: String!
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

  type Mutation {
    addOrganization(name: String!): Organization
  }
`;

export const resolvers: IResolvers = {
  Query: {
    organizations: () => organizations,
    organization: (obj, { name }) => organizations.find((o) => o.name === name),
    author: () => octokit.users.getForUser({ username: 'hiroppy' }).then(({ data }) => data)
  },
  Mutation: {
    addOrganization: (obj, { name }) => {
      if (organizations.some((o) => o.name === name)) throw new Error('already exist');

      const org = {
        name,
        uid: organizations.length + 1,
        uri: `https://github.com/${name}`
      };

      organizations.push(org);

      return org;
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
