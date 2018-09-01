import { all, fork } from 'redux-saga/effects';
import { orgsProcess } from './orgs';
import { errorsProcess } from './errors';
import { pagesProcess } from './pages';

/**
 * Root for saga
 */
export function* rootSaga() {
  yield all([fork(orgsProcess)]);
  yield all([fork(errorsProcess)]);
  yield all([fork(pagesProcess)]);
}
