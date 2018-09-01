import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { Error } from '.';

test('should render self and sub-components', () => {
  const tree = shallow(
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <Error>foo</Error>
    </MemoryRouter>
  );

  expect(toJson(tree)).toMatchSnapshot();
});
