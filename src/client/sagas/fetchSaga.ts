import { put, call, takeLatest, select } from 'redux-saga/effects';
import fetch from 'cross-fetch';
import {
  FETCH_SAGA_CODE,
  fetchSagaCode as FetchSagaCode,
  fetchSagaCodeSuccess,
  fetchSagaCodeFailure,
  ADD_LIKE,
  addLike as AddLike,
  addLikeSuccess,
  addLikeFailure
} from '../actions/fetchSaga';
import { State } from '../reducers/sagaPage';
import { getBaseUrl } from '../selectors';

function* fetchMethod({
  path,
  params,
  options
}: {
  path: string;
  params?: Record<string, any>;
  options?: Record<string, any>;
}) {
  const baseUrl = yield select(getBaseUrl);
  const url = new URL(`${baseUrl || window.origin}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value || '');
    });
  }

  const res: Response = yield call(fetch, url.toString(), options);
  const { body }: { body: State['samples'] } = yield res.json();

  return body;
}

function* fetchSagaCode(action: ReturnType<typeof FetchSagaCode>) {
  try {
    const params = { maxLength: action.payload.maxLength };
    const body = yield fetchMethod({
      path: '/api/saga',
      params
    });

    yield put(fetchSagaCodeSuccess(body));
  } catch (err) {
    yield put(fetchSagaCodeFailure(err));
  }
}

function* addLike(action: ReturnType<typeof AddLike>) {
  const { id } = action.payload;
  const options = { method: 'POST' };

  try {
    // actually, this method doesn't run on Node.js so it's unnecessary to create a full url
    const body = yield fetchMethod({
      path: `/api/saga/${id}`,
      options
    });

    // need to optimize this because it's better to avoid fetching all data
    // currently, apollo's mutation uses `refetchQueries` so make the behavior the same.
    yield put(FetchSagaCode(null));
    yield put(addLikeSuccess(body));
  } catch (err) {
    yield put(addLikeFailure(err));
  }
}

export function* fetchSagaProcess() {
  yield takeLatest(FETCH_SAGA_CODE, fetchSagaCode);
  yield takeLatest(ADD_LIKE, addLike);
}
