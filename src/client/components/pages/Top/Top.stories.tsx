import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { gql } from 'apollo-boost';
import { Top } from '.';

const stories = storiesOf('components/pages/Top', module);

const query = gql`
  {
    organizations {
      uid
      name
    }
  }
`;

const mockedData = {
  organizations: [
    {
      uid: 1,
      name: 'name',
      uri: 'uri',
      __typename: 'organazations'
    }
  ]
};

const mocks = [{ request: { query }, result: { data: mockedData } }];

stories.add('default', () => (
  <div
    style={{
      width: '80%',
      margin: '50px auto',
      background: '#fff'
    }}
  >
    <MockedProvider mocks={mocks}>
      <MemoryRouter initialEntries={['/']}>
        <Top error={null} load={() => {}} />
      </MemoryRouter>
    </MockedProvider>
  </div>
));
