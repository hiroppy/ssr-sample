import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '.';

test('should render self and sub-components', () => {
  const tree = mount(
    <MemoryRouter initialEntries={['/']}>
      <Header userName="foo" orgName="org!" />
    </MemoryRouter>
  );

  expect(toJson(tree)).toMatchSnapshot();
});
