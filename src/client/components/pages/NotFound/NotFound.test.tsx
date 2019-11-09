import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NotFound from '.';
import { initialState } from '../../../reducers';
import * as actions from '../../../actions/pages';

test('should call loadTopPage via useDispatch', () => {
  const loadTopPage = jest.spyOn(actions, 'loadTopPage');
  const mockStore = configureStore()(initialState);

  render(
    <Provider store={mockStore}>
      <NotFound />
    </Provider>
  );

  expect(loadTopPage).toBeCalled();
});
