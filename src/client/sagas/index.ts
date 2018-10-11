import { all, fork } from 'redux-saga/effects';
import { orgsProcess } from './orgs';
import { pagesProcess } from './pages';

/**
 * Root for saga
 */
export function* rootSaga() {
  yield all([fork(orgsProcess), fork(pagesProcess)]);
}
