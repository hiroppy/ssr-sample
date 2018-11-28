import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { App } from '.';

test('should render self and sub-components', () => {
  const tree = shallow(
    <App name="foo" setUserName={() => {}}>
      <p>hello</p>
    </App>
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should call setUserName if name is empty', () => {
  const setUserName = jest.fn();

  shallow(
    <App name="" setUserName={setUserName}>
      <p>hello</p>
    </App>
  );

  expect(setUserName).toHaveBeenCalled();
});
