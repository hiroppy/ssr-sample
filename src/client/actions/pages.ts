import { State } from '../reducers/pages';

export type Actions =
  | ReturnType<typeof setEnv>
  | ReturnType<typeof setBaseUrl>
  | ReturnType<typeof resetPageStatus>
  | ReturnType<typeof loadAppProcess>
  | ReturnType<typeof loadAppProcessSuccess>
  | ReturnType<typeof loadAppProcessFailure>
  | ReturnType<typeof loadTopPage>
  | ReturnType<typeof loadTopPageSuccess>
  | ReturnType<typeof loadTopPageFailure>
  | ReturnType<typeof loadSagaPage>
  | ReturnType<typeof loadSagaPageSuccess>
  | ReturnType<typeof loadSagaPageFailure>
  | ReturnType<typeof loadApolloPage>
  | ReturnType<typeof loadApolloPageSuccess>
  | ReturnType<typeof loadApolloPageFailure>;

export const SET_ENV = 'SET_ENV';
export const setEnv = (env: State['env']) =>
  ({
    type: SET_ENV,
    payload: {
      env,
    },
  } as const);

export const SET_BASE_URL = 'SET_BASE_URL';
export const setBaseUrl = (baseUrl: State['baseUrl']) =>
  ({
    type: SET_BASE_URL,
    payload: {
      baseUrl,
    },
  } as const);

export const RESET_PAGES_STATUS = 'RESET_PAGES_STATUS';
export const resetPageStatus = () =>
  ({
    type: RESET_PAGES_STATUS,
  } as const);

export const LOAD_APP_PROCESS = 'LOAD_APP_PROCESS';
export const loadAppProcess = () =>
  ({
    type: LOAD_APP_PROCESS,
  } as const);

export const LOAD_APP_PROCESS_SUCCESS = 'LOAD_APP_PROCESS_SUCCESS';
export const loadAppProcessSuccess = () =>
  ({
    type: LOAD_APP_PROCESS_SUCCESS,
  } as const);

export const LOAD_APP_PROCESS_FAILURE = 'LOAD_APP_PROCESS_FAILURE';
export const loadAppProcessFailure = (err: Error) =>
  ({
    type: LOAD_APP_PROCESS_FAILURE,
    payload: {
      err,
    },
  } as const);

export const LOAD_TOP_PAGE = 'LOAD_TOP_PAGE';
export const loadTopPage = () =>
  ({
    type: LOAD_TOP_PAGE,
  } as const);

export const LOAD_TOP_PAGE_SUCCESS = 'LOAD_TOP_PAGE_SUCCESS';
export const loadTopPageSuccess = () =>
  ({
    type: LOAD_TOP_PAGE_SUCCESS,
  } as const);

export const LOAD_TOP_PAGE_FAILURE = 'LOAD_TOP_PAGE_FAILURE';
export const loadTopPageFailure = (err: Error) =>
  ({
    type: LOAD_TOP_PAGE_FAILURE,
    payload: {
      err,
    },
  } as const);

export const LOAD_SAGA_PAGE = 'LOAD_SAGA_PAGE';
export const loadSagaPage = (maxLength: string | null) =>
  ({
    type: LOAD_SAGA_PAGE,
    payload: {
      maxLength,
    },
  } as const);

export const LOAD_SAGA_PAGE_SUCCESS = 'LOAD_SAGA_PAGE_SUCCESS';
export const loadSagaPageSuccess = () =>
  ({
    type: LOAD_SAGA_PAGE_SUCCESS,
  } as const);

export const LOAD_SAGA_PAGE_FAILURE = 'LOAD_SAGA_PAGE_FAILURE';
export const loadSagaPageFailure = (err: Error) =>
  ({
    type: LOAD_SAGA_PAGE_FAILURE,
    payload: {
      err,
    },
  } as const);

export const LOAD_APOLLO_PAGE = 'LOAD_APOLLO_PAGE';
export const loadApolloPage = () =>
  ({
    type: LOAD_APOLLO_PAGE,
  } as const);

export const LOAD_APOLLO_PAGE_SUCCESS = 'LOAD_APOLLO_PAGE_SUCCESS';
export const loadApolloPageSuccess = () =>
  ({
    type: LOAD_APOLLO_PAGE_SUCCESS,
  } as const);

export const LOAD_APOLLO_PAGE_FAILURE = 'LOAD_APOLLO_PAGE_FAILURE';
export const loadApolloPageFailure = (err: Error) =>
  ({
    type: LOAD_APOLLO_PAGE_FAILURE,
    payload: {
      err,
    },
  } as const);
