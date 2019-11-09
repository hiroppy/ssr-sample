import { all, fork } from 'redux-saga/effects';
import { pagesProcess } from './pages';
import { fetchSagaProcess } from './fetchSaga';

/**
 * Root for saga
 */
export function* rootSaga() {
  yield all([fork(pagesProcess), fork(fetchSagaProcess)]);
}
