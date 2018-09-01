import { END } from 'redux-saga';
import { put, take, select, takeLatest } from 'redux-saga/effects';
import {
  loadTopPageSuccess,
  loadTopPageFailure,
  LoadOrgsPage,
  loadOrgsPageSuccess,
  loadOrgsPageFailure
} from '../actions/pages';
import { fetchRepos, resetOrgs } from '../actions/orgs';
import { getOrgs } from './selectors';
import { State } from '../reducers';

function* loadTopPage() {
  try {
    yield put(loadTopPageSuccess());
  } catch (e) {
    // yield put(loadTopPageFailure());
  } finally {
    if (!process.env.IS_BROWSER) yield put(END);
  }
}

function* loadOrgsPage(action: LoadOrgsPage) {
  try {
    const { org } = action.payload;
    const orgs: State['orgs'] = yield select(getOrgs);

    if (org !== orgs.name) {
      yield put(resetOrgs());
      yield put(fetchRepos(org));
      const res = yield take(['FETCH_REPOS_SUCCESS', 'FETCH_REPOS_FAILURE']);

      if (res.type === 'FETCH_REPOS_FAILURE') throw new Error(res.payload.code);
    }

    yield put(loadOrgsPageSuccess());
  } catch (e) {
    const code = e || e.message;

    switch (code) {
      case 404:
        console.log('404');
      case 403:
        console.log('403');
    }
    yield put(loadOrgsPageFailure());
  } finally {
    if (!process.env.IS_BROWSER) yield put(END);
  }
}

export function* pagesProcess() {
  yield takeLatest('LOAD_TOP_PAGE', loadTopPage);
  yield takeLatest('LOAD_ORGS_PAGE', loadOrgsPage);
}
