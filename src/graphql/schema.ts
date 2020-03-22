import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { apolloSamples } from '../server/responseSchema';

export const typeDefs = `
  type Sample {
    id: Int!
    code: String!
    name: String!
    likeCount: Int!
    description: String
  }

  type Query {
    samples(maxLength: Int): [Sample]
  }

  type Mutation {
    addLike(id: Int): Sample
  }
`;

export const resolvers: IResolvers = {
  Query: {
    samples: (obj, { maxLength }: { maxLength?: number }) => {
      return apolloSamples.slice(0, maxLength || apolloSamples.length);
    },
  },
  Mutation: {
    addLike: (obj, { id }: { id: number }) => {
      const item = apolloSamples.find(({ id: fileId }) => id === fileId);

      if (item) {
        ++item.likeCount;

        return item;
      } else {
        throw new Error('Could not find');
      }
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
