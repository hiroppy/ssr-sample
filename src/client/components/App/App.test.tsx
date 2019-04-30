import * as React from 'react';
import { shallow } from 'enzyme';
import { App } from '.';

test('should call load if name is empty', () => {
  const load = jest.fn();

  shallow(
    <App load={load}>
      <p>hello</p>
    </App>
  );

  expect(load).toHaveBeenCalled();
});
