import { graphql } from 'graphql';
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
