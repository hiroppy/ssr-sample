import * as React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '.';

test('should render self and sub-components', () => {
  const tree = mount(
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <NotFound />
    </MemoryRouter>
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should call stopSaga', () => {
  const stop = jest.fn();

  shallow(<NotFound stopSaga={stop} />);

  expect(stop).toHaveBeenCalled();
});
