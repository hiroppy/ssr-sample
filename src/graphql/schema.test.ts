import { graphql } from 'graphql';
import { schema } from './schema';
import { apolloSamples } from '../server/responseSchema';

test('should return result from samples resolver', async () => {
  const GET_SAMPLES = `
    query getSamples($maxLength: Int) {
      samples(maxLength: $maxLength) {
        id
        name
        code
        likeCount
        description
      }
    }
  `;

  const res = await graphql(
    schema,
    GET_SAMPLES,
    null,
    {
      samples: apolloSamples
    },
    {
      maxLength: 1
    }
  );

  expect(res).toMatchSnapshot();
});

test('should return result from addLike resolver', async () => {
  const ADD_LIKE = `
    mutation addLike($id: Int) {
      addLike(id: $id) {
        id
      }
    }
  `;

  {
    const res = await graphql(
      schema,
      ADD_LIKE,
      null,
      {
        samples: apolloSamples
      },
      {
        id: 1
      }
    );

    expect(res).toMatchSnapshot();
  }

  {
    const res = await graphql(
      schema,
      ADD_LIKE,
      null,
      {
        samples: apolloSamples
      },
      {
        id: 1000
      }
    );

    expect(res).toMatchSnapshot();
  }
});
