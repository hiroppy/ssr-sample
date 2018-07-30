import { all, fork } from 'redux-saga/effects';
import { reposProcess } from './repos';
import { errorsProcess } from './errors';

/**
 * Root for saga
 */
export function* rootSaga() {
  yield all([fork(reposProcess)]);
  yield all([fork(errorsProcess)]);
}
