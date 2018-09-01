import * as React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import { Top } from '.';

test('should render self and sub-components', () => {
  const tree = mount(
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <Top load={() => {}} />
    </MemoryRouter>
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should call load', () => {
  const load = sinon.spy();

  shallow(<Top load={load} />);

  expect(load.calledOnce).toBeTruthy();
});
