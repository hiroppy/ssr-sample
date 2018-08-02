import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
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
  const setUserName = sinon.spy();

  shallow(
    <App name="" setUserName={setUserName}>
      <p>hello</p>
    </App>
  );

  expect(setUserName.calledOnce).toBeTruthy();
});
