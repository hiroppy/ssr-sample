import * as React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { MockedProvider } from 'react-apollo/test-utils';
import { Top } from '.';

const mockedData = {
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

test('should render self and sub-components', () => {
  const GET_ORGS = gql`
    {
      organizations {
        name
        uid
      }
    }
  `;
  const mocks = [{ request: { query: GET_ORGS }, result: { data: mockedData } }];

  const tree = shallow(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Top error={null} load={() => {}} />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should call load', () => {
  const load = sinon.spy();

  mount(
    <MockedProvider>
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Top error={null} load={load} />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(load.calledOnce).toBeTruthy();
});
