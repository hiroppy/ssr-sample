import { loadSagaPage } from './pages';
import { sagaSamples } from '../../server/responseSchema';

export const FETCH_SAGA_CODE = 'FETCH_SAGA_CODE';
export const fetchSagaCode = (maxLength: Parameters<typeof loadSagaPage>[0]) =>
  ({
    type: FETCH_SAGA_CODE,
    payload: {
      maxLength
    }
  } as const);

export const FETCH_SAGA_CODE_SUCCESS = 'FETCH_SAGA_CODE_SUCCESS';
export const fetchSagaCodeSuccess = (samples: typeof sagaSamples) =>
  ({
    type: FETCH_SAGA_CODE_SUCCESS,
    payload: {
      samples
    }
  } as const);

export const FETCH_SAGA_CODE_FAILURE = 'FETCH_SAGA_CODE_FAILURE';
export const fetchSagaCodeFailure = (err: Error) =>
  ({
    type: FETCH_SAGA_CODE_FAILURE,
    payload: {
      err
    }
  } as const);

export const ADD_LIKE = 'ADD_LIKE';
export const addLike = (id: number) =>
  ({
    type: ADD_LIKE,
    payload: {
      id
    }
  } as const);

export const ADD_LIKE_SUCCESS = 'ADD_LIKE_SUCCESS';
export const addLikeSuccess = (res: typeof sagaSamples[0]) =>
  ({
    type: ADD_LIKE_SUCCESS,
    payload: {
      res
    }
  } as const);

export const ADD_LIKE_FAILURE = 'ADD_LIKE_FAILURE';
export const addLikeFailure = (err: Error) =>
  ({
    type: ADD_LIKE_FAILURE,
    payload: {
      err
    }
  } as const);

export type Actions =
  | ReturnType<typeof fetchSagaCode>
  | ReturnType<typeof fetchSagaCodeSuccess>
  | ReturnType<typeof fetchSagaCodeFailure>
  | ReturnType<typeof addLike>
  | ReturnType<typeof addLikeSuccess>
  | ReturnType<typeof addLikeFailure>;
