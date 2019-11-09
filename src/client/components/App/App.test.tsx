import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { App } from '.';
import { initialState } from '../../reducers';
import * as actions from '../../actions/pages';

test('should call loadAppProcess via useDispatch', () => {
  const mockStore = configureStore()(initialState);

  // browser
  {
    process.env.IS_BROWSER = 'true';

    const loadAppProcess = jest.spyOn(actions, 'loadAppProcess');

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']} keyLength={0}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(loadAppProcess).toBeCalled();

    delete process.env.IS_BROWSER;
    loadAppProcess.mockClear();
  }

  // server
  {
    const loadAppProcess = jest.spyOn(actions, 'loadAppProcess');

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']} keyLength={0}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(loadAppProcess).toBeCalled();
    loadAppProcess.mockClear();
  }
});
