import { reducer, initialState } from './sagaPage';
import * as actions from '../actions/fetchSaga';
import { sagaSamples } from '../../server/responseSchema';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined } as any)).toEqual(initialState);
});

test('should handle FETCH_SAGA_CODE', () => {
  expect(reducer(initialState, actions.fetchSagaCode('2'))).toMatchSnapshot();
});

test('should handle FETCH_SAGA_CODE_SUCCESS', () => {
  expect(reducer(initialState, actions.fetchSagaCodeSuccess(sagaSamples))).toMatchSnapshot();
});

test('should handle FETCH_SAGA_CODE_FAILURE', () => {
  expect(reducer(initialState, actions.fetchSagaCodeFailure(new Error('404')))).toMatchSnapshot();
});
