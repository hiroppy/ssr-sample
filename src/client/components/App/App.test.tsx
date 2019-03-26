import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { App } from '.';

const noop = () => {};

test('should render self and sub-components', () => {
  const tree = shallow(
    <App load={noop}>
      <p>hello</p>
    </App>
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should call load if name is empty', () => {
  const load = jest.fn();

  shallow(
    <App load={load}>
      <p>hello</p>
    </App>
  );

  expect(load).toHaveBeenCalled();
});
