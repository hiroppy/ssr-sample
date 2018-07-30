import { put, takeLatest } from 'redux-saga/effects';

function* errorsRouter(action: any) {
  // currently, only exist API_LIMIT_ERROT
  yield put({
    type: 'ERROR_API_LIMIT',
    payload: action.payload
  });
}

function* apiLimit(action: any) {
  yield alert(action.payload.message);
}

export function* errorsProcess() {
  yield takeLatest('ERROR', errorsRouter);
  yield takeLatest('ERROR_API_LIMIT', apiLimit);
}
