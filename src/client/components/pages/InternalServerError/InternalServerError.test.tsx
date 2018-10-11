import * as React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as sinon from 'sinon';
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
  const stop = sinon.spy();

  shallow(<InternalServerError stopSaga={stop} />);

  expect(stop.calledOnce).toBeTruthy();
});
