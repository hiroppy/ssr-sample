import { expectSaga } from 'redux-saga-test-plan';
import { errorsProcess } from './errors';

const storeState = {};

test('should take on the ERROR action', () => {
  process.env.IS_BROWSER = 'true';

  return expectSaga(errorsProcess)
    .withState(storeState)
    .put({
      type: 'ERROR_API_LIMIT',
      payload: {
        message: 'foo'
      }
    })
    .dispatch({
      type: 'ERROR',
      payload: {
        message: 'foo'
      }
    })
    .run();
});
