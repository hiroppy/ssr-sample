import { Action } from 'redux';

export type Actions =
  | ResetPagesStatus
  | LoadTopPage
  | LoadTopPageSuccess
  | LoadTopPageFailure
  | LoadOrgsPage
  | LoadOrgsPageSuccess
  | LoadOrgsPageFailure
  | StopSaga;

export interface ResetPagesStatus extends Action {
  type: 'RESET_PAGES_STATUS';
}

export const resetPageStatus = (): ResetPagesStatus => ({
  type: 'RESET_PAGES_STATUS'
});

export interface LoadTopPage {
  type: 'LOAD_TOP_PAGE';
}

export const loadTopPage = (): LoadTopPage => ({
  type: 'LOAD_TOP_PAGE'
});

export interface LoadTopPageSuccess {
  type: 'LOAD_TOP_PAGE_SUCCESS';
}

export const loadTopPageSuccess = (): LoadTopPageSuccess => ({
  type: 'LOAD_TOP_PAGE_SUCCESS'
});

export interface LoadTopPageFailure {
  type: 'LOAD_TOP_PAGE_FAILURE';
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

export interface LoadOrgsPage {
  type: 'LOAD_ORGS_PAGE';
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

export interface LoadOrgsPageSuccess {
  type: 'LOAD_ORGS_PAGE_SUCCESS';
}

export const loadOrgsPageSuccess = (): LoadOrgsPageSuccess => ({
  type: 'LOAD_ORGS_PAGE_SUCCESS'
});

export interface LoadOrgsPageFailure {
  type: 'LOAD_ORGS_PAGE_FAILURE';
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

export interface StopSaga {
  type: 'STOP_SAGA';
}

export const stopSaga = (): StopSaga => ({
  type: 'STOP_SAGA'
});
