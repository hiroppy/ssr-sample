import * as React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { InternalServerError } from '.';

test('should render self and sub-components', () => {
  const tree = mount(
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
      <InternalServerError />
    </MemoryRouter>
  );

  expect(toJson(tree)).toMatchSnapshot();
});

test('should call stopSaga', () => {
  const stop = jest.fn();

  shallow(<InternalServerError stopSaga={stop} />);

  expect(stop).toHaveBeenCalled();
});
