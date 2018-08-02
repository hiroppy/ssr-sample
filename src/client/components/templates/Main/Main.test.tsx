import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Main } from '.';

test('should render self and sub-components', () => {
  const tree = shallow(
    <Main>
      <p>foo</p>
    </Main>
  );

  expect(toJson(tree)).toMatchSnapshot();
});
