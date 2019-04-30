import * as React from 'react';
import { shallow } from 'enzyme';
import { NotFound } from '.';

test('should call stopSaga', () => {
  const stop = jest.fn();

  shallow(<NotFound stopSaga={stop} />);

  expect(stop).toHaveBeenCalled();
});
