import * as React from 'react';
import { shallow } from 'enzyme';
import { InternalServerError } from '.';

test('should call stopSaga', () => {
  const stop = jest.fn();

  shallow(<InternalServerError stopSaga={stop} />);

  expect(stop).toHaveBeenCalled();
});
