import { END } from 'redux-saga';
import { put, call, take, select, takeLatest } from 'redux-saga/effects';
import {
  loadTopPageSuccess,
  loadTopPageFailure,
  LoadOrgsPage,
  loadOrgsPageSuccess,
  loadOrgsPageFailure,
  resetPageStatus
} from '../actions/pages';
import { fetchRepos, FetchReposSuccess, FetchReposFailure, resetOrgs } from '../actions/orgs';
import { getOrgs } from './selectors';
import { State } from '../reducers';

function* loadTopPage() {
  try {
    yield put(loadTopPageSuccess());
  } catch (err) {
    yield put(loadTopPageFailure(err));
  } finally {
    if (!process.env.IS_BROWSER) yield call(stopSaga);
  }
}

function* loadOrgsPage(action: LoadOrgsPage) {
  try {
    const { org } = action.payload;
    const orgs: State['orgs'] = yield select(getOrgs);

    if (org !== orgs.name) {
      yield put(resetOrgs());
      yield put(fetchRepos(org));
      const res: FetchReposSuccess | FetchReposFailure = yield take([
        'FETCH_REPOS_SUCCESS',
        'FETCH_REPOS_FAILURE'
      ]);

      if (res.type === 'FETCH_REPOS_FAILURE') throw res.payload;
    }

    yield put(loadOrgsPageSuccess());
  } catch (err) {
    yield put(loadOrgsPageFailure(err));
  } finally {
    if (!process.env.IS_BROWSER) yield call(stopSaga);
  }
}

function* stopSaga() {
  yield put(END);
}

function* changeLocation() {
  yield put(resetPageStatus());
}

export function* pagesProcess() {
  yield takeLatest('LOAD_TOP_PAGE', loadTopPage);
  yield takeLatest('LOAD_ORGS_PAGE', loadOrgsPage);
  yield takeLatest('STOP_SAGA', stopSaga);
  yield takeLatest('@@router/LOCATION_CHANGE', changeLocation);
}
