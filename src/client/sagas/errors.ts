import { put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import { AppError } from '../actions/errors';

function* errorsRouter(action: AppError) {
  const { message } = action.payload.err;

  if (message === '404') yield put(replace('/404'));
}

export function* errorsProcess() {
  yield takeLatest('APP_ERROR', errorsRouter);
}
