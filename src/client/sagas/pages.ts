import { END } from 'redux-saga';
import { put, take, select, takeLatest } from 'redux-saga/effects';
import {
  loadTopPageSuccess,
  loadTopPageFailure,
  LoadOrgsPage,
  loadOrgsPageSuccess,
  loadOrgsPageFailure,
  resetPageStatus
} from '../actions/pages';
import { fetchRepos, resetOrgs } from '../actions/orgs';
import { getOrgs } from './selectors';
import { State } from '../reducers';

function* loadErrorPage() {
  if (!process.env.IS_BROWSER) yield put(END);
}

function* loadTopPage() {
  try {
    yield put(loadTopPageSuccess());
  } catch (err) {
    yield put(loadTopPageFailure(err));
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
  } catch (err) {
    yield put(loadOrgsPageFailure(err));
  } finally {
    if (!process.env.IS_BROWSER) yield put(END);
  }
}

function* stopSaga() {
  yield put(END);
}

function* changeLocation() {
  yield put(resetPageStatus());
}

export function* pagesProcess() {
  yield takeLatest('LOAD_ERROR_PAGE', loadErrorPage);
  yield takeLatest('LOAD_TOP_PAGE', loadTopPage);
  yield takeLatest('LOAD_ORGS_PAGE', loadOrgsPage);
  yield takeLatest('STOP_SAGA', stopSaga);
  yield takeLatest('@@router/LOCATION_CHANGE', changeLocation);
}
