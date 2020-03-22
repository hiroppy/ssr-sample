import { expectSaga } from 'redux-saga-test-plan';
import { initialState } from '../reducers/pages';
import { fetchSagaProcess } from './fetchSaga';
import * as actions from '../actions/fetchSaga';
import { sagaSamples } from '../../server/responseSchema';

const state = {
  pages: {
    ...initialState,
    baseUrl: 'http://test.com',
  },
};

test('should take on the FETCH_SAGA_CODE_SUCCESS action', () => {
  return expectSaga(fetchSagaProcess)
    .withState(state)
    .provide({
      call: () => ({
        json: () => {
          return Promise.resolve({
            body: sagaSamples,
          });
        },
      }),
    })
    .put(actions.fetchSagaCodeSuccess(sagaSamples))
    .dispatch(actions.fetchSagaCode('2'))
    .silentRun();
});

test('should take on the FETCH_SAGA_CODE_FAILURE action', () => {
  return expectSaga(fetchSagaProcess)
    .withState(state)
    .provide({
      call: () => {
        throw new Error();
      },
    })
    .put(actions.fetchSagaCodeFailure(new Error()))
    .dispatch(actions.fetchSagaCode('2'))
    .silentRun();
});

test('should take on the ADD_LIKE_SUCCESS action', () => {
  return expectSaga(fetchSagaProcess)
    .withState(state)
    .provide({
      call: () => ({
        json: () => {
          return Promise.resolve({
            body: sagaSamples[0],
          });
        },
      }),
    })
    .put(actions.addLikeSuccess(sagaSamples[0]))
    .dispatch(actions.addLike(1))
    .silentRun();
});

test('should take on the ADD_LIKE_FAILURE action', () => {
  return expectSaga(fetchSagaProcess)
    .withState(state)
    .provide({
      call: () => {
        throw new Error();
      },
    })
    .put(actions.addLikeFailure(new Error()))
    .dispatch(actions.addLike(1))
    .silentRun();
});
