import React from 'react';
import { render, getAllByTestId, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Saga from '.';
import { initialState } from '../../../reducers';
import * as actions from '../../../actions/pages';
import * as sagaActions from '../../../actions/fetchSaga';
import { sagaSamples } from '../../../../server/responseSchema';

function run(state = {}) {
  const mockStore = configureStore()({ ...initialState, ...state });

  return render(
    <Provider store={mockStore}>
      <MemoryRouter initialEntries={['/saga']} keyLength={0}>
        <Saga />
      </MemoryRouter>
    </Provider>
  );
}

test('should call loadSagaPage via useDispatch', () => {
  const loadSagaPage = jest.spyOn(actions, 'loadSagaPage');

  run();

  expect(loadSagaPage).toBeCalled();
});

test('should call loadSagaPage via useDispatch when IS_BROWSER is true', () => {
  process.env.IS_BROWSER = 'true';

  const loadSagaPage = jest.spyOn(actions, 'loadSagaPage');

  run();

  expect(loadSagaPage).toBeCalled();
});

// useCallback
test('should call addLike when a like button is clicked', () => {
  const addLike = jest.spyOn(sagaActions, 'addLike');
  const { container } = run({
    sagaPage: {
      samples: sagaSamples,
    },
  });
  const [box] = getAllByTestId(container, 'like-button');

  fireEvent.click(box);

  expect(addLike).toBeCalled();
});
