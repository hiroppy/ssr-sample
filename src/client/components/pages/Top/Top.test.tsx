import * as React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { Top } from '.';

test('should call load', () => {
  const load = jest.fn();

  mount(
    <MockedProvider>
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Top error={null} load={load} />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(load).toHaveBeenCalled();
});
