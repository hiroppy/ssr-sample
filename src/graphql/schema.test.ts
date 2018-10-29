import { graphql } from 'graphql';
import * as nock from 'nock';
import { organizations, schema } from './schema';

test('should return organizations resolver', async () => {
  const GET_ORGS = `
    query {
      organizations {
        name
        uid
      }
    }
  `;

  const res = await graphql(schema, GET_ORGS, null, {
    organizations
  });

  expect(res).toMatchSnapshot();
});

test('should return organization resolver', async () => {
  const GET_ORG = `
    query {
      organization(name: "nodejs") {
        name
        uid
        uri
      }
    }
  `;

  const res = await graphql(schema, GET_ORG, null, {
    organizations
  });

  expect(res).toMatchSnapshot();
});

test('should return author resolver', async () => {
  nock('https://api.github.com')
    .get('/users/hiroppy')
    .reply(200, {
      id: 1,
      name: 'hiroppy',
      blog: 'blog',
      avatar_url: 'avatar',
      html_url: 'html',
      dummy: 'dummy'
    });

  const GET_AUTHOR = `
    query {
      author {
        id
        name
        blog
        avatar_url
        html_url
      }
    }
  `;

  const res = await graphql(schema, GET_AUTHOR, null);

  expect(res).toMatchSnapshot();
});

test('should return addOrganization resolver', async () => {
  const ADD_ORGANIZATION = `
    mutation addOrganization($name: String!) {
      addOrganization(name: $name) {
        name
        uri
        uid
      }
    }
  `;

  const res = await graphql(
    schema,
    ADD_ORGANIZATION,
    null,
    {
      organizations
    },
    {
      name: 'test'
    }
  );

  expect(res).toMatchSnapshot();
});
