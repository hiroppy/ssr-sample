import { Action } from 'redux';

export type Actions =
  | ResetPagesStatus
  | LoadAppProcess
  | LoadAppProcessSuccess
  | LoadAppProcessFailure
  | LoadTopPage
  | LoadTopPageSuccess
  | LoadTopPageFailure
  | LoadOrgsPage
  | LoadOrgsPageSuccess
  | LoadOrgsPageFailure
  | StopSaga;

export interface ResetPagesStatus extends Action<'RESET_PAGES_STATUS'> {}

export interface LoadAppProcess extends Action<'LOAD_APP_PROCESS'> {}

export const loadAppProcess = (): LoadAppProcess => ({
  type: 'LOAD_APP_PROCESS'
});

export interface LoadAppProcessSuccess extends Action<'LOAD_APP_PROCESS_SUCCESS'> {}

export const loadAppProcessSuccess = (): LoadAppProcessSuccess => ({
  type: 'LOAD_APP_PROCESS_SUCCESS'
});

export interface LoadAppProcessFailure extends Action<'LOAD_APP_PROCESS_FAILURE'> {
  err: Error;
}

export const loadAppProcessFailure = (err: Error): LoadAppProcessFailure => ({
  type: 'LOAD_APP_PROCESS_FAILURE',
  err
});

export const resetPageStatus = (): ResetPagesStatus => ({
  type: 'RESET_PAGES_STATUS'
});

export interface LoadTopPage extends Action<'LOAD_TOP_PAGE'> {}

export const loadTopPage = (): LoadTopPage => ({
  type: 'LOAD_TOP_PAGE'
});

export interface LoadTopPageSuccess extends Action<'LOAD_TOP_PAGE_SUCCESS'> {}

export const loadTopPageSuccess = (): LoadTopPageSuccess => ({
  type: 'LOAD_TOP_PAGE_SUCCESS'
});

export interface LoadTopPageFailure extends Action<'LOAD_TOP_PAGE_FAILURE'> {
  payload: {
    err: Error;
  };
}

export const loadTopPageFailure = (err: Error): LoadTopPageFailure => ({
  type: 'LOAD_TOP_PAGE_FAILURE',
  payload: {
    err
  }
});

export interface LoadOrgsPage extends Action<'LOAD_ORGS_PAGE'> {
  payload: {
    org: string;
  };
}

export const loadOrgsPage = (org: LoadOrgsPage['payload']['org']): LoadOrgsPage => ({
  type: 'LOAD_ORGS_PAGE',
  payload: {
    org
  }
});

export interface LoadOrgsPageSuccess extends Action<'LOAD_ORGS_PAGE_SUCCESS'> {}

export const loadOrgsPageSuccess = (): LoadOrgsPageSuccess => ({
  type: 'LOAD_ORGS_PAGE_SUCCESS'
});

export interface LoadOrgsPageFailure extends Action<'LOAD_ORGS_PAGE_FAILURE'> {
  payload: {
    err: Error;
  };
}

export const loadOrgsPageFailure = (err: Error): LoadOrgsPageFailure => ({
  type: 'LOAD_ORGS_PAGE_FAILURE',
  payload: {
    err
  }
});

export interface StopSaga extends Action<'STOP_SAGA'> {}

export const stopSaga = (): StopSaga => ({
  type: 'STOP_SAGA'
});
