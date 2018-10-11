import * as React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import { Top } from '.';

test('should render self and sub-components', () => {
  const tree = mount(
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <Top error={null} load={() => {}} />
    </MemoryRouter>
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should call load', () => {
  const load = sinon.spy();

  mount(
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <Top error={null} load={load} />
    </MemoryRouter>
  );

  expect(load.calledOnce).toBeTruthy();
});
