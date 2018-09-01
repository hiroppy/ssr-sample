import { expectSaga } from 'redux-saga-test-plan';
import { errorsProcess } from './errors';
import { appError } from '../actions/errors';

const storeState = {};

test('should take on the ERROR action', () => {
  return expectSaga(errorsProcess)
    .withState(storeState)
    .dispatch(appError(new Error('404')))
    .run();
});
