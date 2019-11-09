import { END } from 'redux-saga';
import { put, call, take, select, takeLatest } from 'redux-saga/effects';
import {
  setEnv,
  resetPageStatus,
  loadAppProcess as LoadAppProcess,
  loadAppProcessSuccess,
  loadAppProcessFailure,
  loadTopPage as LoadTopPage,
  loadTopPageSuccess,
  loadTopPageFailure,
  loadSagaPage as LoadSagaPage,
  loadSagaPageSuccess,
  loadSagaPageFailure,
  loadApolloPage as LoadApolloPage,
  loadApolloPageSuccess,
  loadApolloPageFailure,
  LOAD_APP_PROCESS,
  LOAD_TOP_PAGE,
  LOAD_SAGA_PAGE,
  LOAD_APOLLO_PAGE
} from '../actions/pages';
import {
  fetchSagaCode,
  fetchSagaCodeSuccess,
  fetchSagaCodeFailure,
  FETCH_SAGA_CODE_SUCCESS,
  FETCH_SAGA_CODE_FAILURE
} from '../actions/fetchSaga';

// e.g. write common processing to be performed on all pages
// don't call `stopSaga`
function* appProcess(actions: ReturnType<typeof LoadAppProcess>) {
  yield put(setEnv(process.env.NODE_ENV || 'development'));
  yield put(loadAppProcessSuccess());
}

// if you run async process, you have to change the code like below
// function* appProcess(actions: ReturnType<typeof LoadAppProcess>) {
//   try {
//     // async

//     yield put(loadAppProcessSuccess());
//   } catch (err) {
//     yield put(loadAppProcessFailure(err));
//   } finally {
//     if (!process.env.IS_BROWSER) {
//       yield call(stopSaga);
//     }
//   }
// }

function* loadTopPage(actions: ReturnType<typeof LoadTopPage>) {
  yield changePage();
  yield put(loadTopPageSuccess());

  if (!process.env.IS_BROWSER) {
    yield call(stopSaga);
  }
}

function* loadSagaPage(actions: ReturnType<typeof LoadSagaPage>) {
  try {
    yield changePage();
    yield put(fetchSagaCode(actions.payload.maxLength));

    const res:
      | ReturnType<typeof fetchSagaCodeSuccess>
      | ReturnType<typeof fetchSagaCodeFailure> = yield take([
      FETCH_SAGA_CODE_SUCCESS,
      FETCH_SAGA_CODE_FAILURE
    ]);

    if (res.type === FETCH_SAGA_CODE_FAILURE) {
      throw res.payload.err;
    }

    yield put(loadSagaPageSuccess());
  } catch (err) {
    yield put(loadSagaPageFailure(err));
  } finally {
    if (!process.env.IS_BROWSER) {
      yield call(stopSaga);
    }
  }
}

function* loadApolloPage(actions: ReturnType<typeof LoadApolloPage>) {
  yield changePage();
  yield put(loadApolloPageSuccess());

  if (!process.env.IS_BROWSER) {
    yield call(stopSaga);
  }
}

function* stopSaga() {
  yield put(END);
}

function* changePage() {
  // don't need to call resetPageStatus because baseUrl is required by fetch on Node.js environment,
  // also state has already been initialized at this time
  if (process.env.IS_BROWSER) {
    yield put(resetPageStatus());
  }
}

export function* pagesProcess() {
  yield takeLatest(LOAD_APP_PROCESS, appProcess);
  yield takeLatest(LOAD_TOP_PAGE, loadTopPage);
  yield takeLatest(LOAD_SAGA_PAGE, loadSagaPage);
  yield takeLatest(LOAD_APOLLO_PAGE, loadApolloPage);
}
