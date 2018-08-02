import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Head } from '.';

test('should render self and sub-components', () => {
  const tree = shallow(<Head title="foo" />);

  expect(toJson(tree)).toMatchSnapshot();
});
