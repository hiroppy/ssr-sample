import { END } from 'redux-saga';
import { put, call, take, select, takeLatest } from 'redux-saga/effects';
import {
  loadAppProcessSuccess,
  loadAppProcessFailure,
  loadTopPageSuccess,
  loadTopPageFailure,
  LoadOrgsPage,
  loadOrgsPageSuccess,
  loadOrgsPageFailure,
  resetPageStatus
} from '../actions/pages';
import { setUserName } from '../actions/users';
import { fetchRepos, FetchReposSuccess, FetchReposFailure, resetOrgs } from '../actions/orgs';
import { getOrgs, getUsers } from './selectors';
import { State } from '../reducers';

// don't call `stopSaga`
function* appProcess() {
  try {
    // e.g. write common processing to be performed on all pages
    const users: State['users'] = yield select<State>(getUsers);

    if (users.name === '') {
      yield put(setUserName('hiroppy'));
    }
    yield put(loadAppProcessSuccess());
  } catch (err) {
    yield put(loadAppProcessFailure(err));
    if (!process.env.IS_BROWSER) yield call(stopSaga);
  }
}

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
  yield takeLatest('LOAD_APP_PROCESS', appProcess);
  yield takeLatest('LOAD_TOP_PAGE', loadTopPage);
  yield takeLatest('LOAD_ORGS_PAGE', loadOrgsPage);
  yield takeLatest('STOP_SAGA', stopSaga);
  yield takeLatest('@@router/LOCATION_CHANGE', changeLocation);
}
