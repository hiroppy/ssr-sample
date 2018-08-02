import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { Top } from '.';

test('should render self and sub-components', () => {
  const tree = mount(
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <Top />
    </MemoryRouter>
  );

  expect(toJson(tree)).toMatchSnapshot();
});
