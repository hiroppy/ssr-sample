import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { gql } from 'apollo-boost';
import { Top } from '.';

const stories = storiesOf('components/pages/Top', module);

const GET_ORGS = gql`
  {
    organizations {
      name
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

const GET_AUTHOR = gql`
  {
    author {
      name
      blog
      avatar_url
    }
  }
`;

const mockedAuthor = {
  author: {
    name: 'hiroppy',
    blog: 'https://hiroppy.me',
    avatar_url: 'https://avatars0.githubusercontent.com/u/3367801?s=400&v=4'
  }
};

const mocks = [
  { request: { query: GET_ORGS }, result: { data: mockedOrgs } },
  { request: { query: GET_AUTHOR }, result: { data: mockedAuthor } }
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
      <MemoryRouter initialEntries={['/']}>
        <Top error={null} load={() => {}} />
      </MemoryRouter>
    </MockedProvider>
  </div>
));
