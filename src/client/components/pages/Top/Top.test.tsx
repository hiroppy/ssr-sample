import * as React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { Top } from '.';

test('should render self and sub-components', () => {
  const tree = shallow(
    <MockedProvider>
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
