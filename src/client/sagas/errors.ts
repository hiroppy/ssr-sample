import { put, takeLatest } from 'redux-saga/effects';

interface Action {
  type: 'ERROR' | 'ERROR_API_LIMIT';
  payload: {
    message: string;
  };
}

function* errorsRouter(action: Action) {
  // currently, only exist API_LIMIT_ERROT
  yield put({
    type: 'ERROR_API_LIMIT',
    payload: action.payload
  });
}

function* apiLimit(action: Action) {
  yield alert(action.payload.message);
}

export function* errorsProcess() {
  yield takeLatest('ERROR', errorsRouter);
  yield takeLatest('ERROR_API_LIMIT', apiLimit);
}
