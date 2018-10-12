import { all, fork } from 'redux-saga/effects';
import { pagesProcess } from './pages';
import { orgsProcess } from './orgs';

/**
 * Root for saga
 */
export function* rootSaga() {
  yield all([fork(pagesProcess), fork(orgsProcess)]);
}
