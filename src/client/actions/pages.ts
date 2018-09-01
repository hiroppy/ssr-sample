import { Action } from 'redux';

export type Actions =
  | ResetPagesStatus
  | LoadTopPage
  | LoadTopPageSuccess
  | LoadTopPageFailure
  | LoadOrgsPage
  | LoadOrgsPageSuccess
  | LoadOrgsPageFailure;

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
}

export const loadTopPageFailure = (): LoadTopPageFailure => ({
  type: 'LOAD_TOP_PAGE_FAILURE'
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
}

export const loadOrgsPageFailure = (): LoadOrgsPageFailure => ({
  type: 'LOAD_ORGS_PAGE_FAILURE'
});
