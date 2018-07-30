import { call, put, takeLatest } from 'redux-saga/effects';
import { FetchRepo } from '../actions/repos';
import { State } from '../reducers/repos';
import * as github from '../utils/githubClient';

function* fetchRepo(action: FetchRepo) {
  try {
    const res: State['repo'] & { status: number } = yield call(github.fetchRepo, {
      owner: action.payload.org,
      repo: action.payload.name
    });

    const { status, ...rest } = res;

    if (status === 200) {
      yield put({
        type: 'FETCH_REPO_SUCCESS',
        payload: rest
      });
    } else {
      throw new Error();
    }
  } catch (e) {
    yield put({
      type: 'ERROR',
      payload: {
        message: JSON.parse(e.message).message
      }
    });
  }
}

export function* reposProcess() {
  yield takeLatest('FETCH_REPO', fetchRepo);
}
