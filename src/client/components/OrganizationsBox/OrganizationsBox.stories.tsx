import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { gql } from 'apollo-boost';
import { OrganizationsBox } from '.';

const stories = storiesOf('components/OrganizationsBox', module);

const GET_ORGS = gql`
  query {
    organizations {
      name
      uid
    }
  }
`;

const ADD_ORG = gql`
  mutation addOrganization($name: String!) {
    addOrganization(name: $name) {
      name
      uri
      uid
    }
  }
`;

const mockedOrgs = {
  organizations: [
    {
      uid: 1,
      name: 'name',
      uri: 'uri'
    },
    {
      uid: 2,
      name: 'name2',
      uri: 'uri'
    },
    {
      uid: 3,
      name: 'name3',
      uri: 'uri'
    },
    {
      uid: 4,
      name: 'name4',
      uri: 'uri'
    }
  ]
};

const mockedAddOrg = {
  addOrganization: {
    uid: 100,
    name: 'aaaa',
    uri: 'uri'
  }
};

const mocks = [
  { request: { query: GET_ORGS }, result: { data: mockedOrgs } },
  { request: { query: ADD_ORG }, result: { data: mockedAddOrg } }
];

stories.add('default', () => (
  <div
    style={{
      width: '80%',
      margin: '50px auto',
      background: '#fff'
    }}
  >
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/']} keyLength={0}>
        <OrganizationsBox />
      </MemoryRouter>
    </MockedProvider>
  </div>
));
