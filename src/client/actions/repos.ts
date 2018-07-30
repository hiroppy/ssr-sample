import { Action } from 'redux';
import { State } from '../reducers/repos';

export type Actions = FetchRepo | FetchRepoSuccess;

export interface FetchRepo extends Action {
  type: 'FETCH_REPO';
  payload: {
    org: string;
    name: string;
  };
}

export const fetchRepo = ({ org, name }: { org: string; name: string }): FetchRepo => ({
  type: 'FETCH_REPO',
  payload: {
    org,
    name
  }
});

export interface FetchRepoSuccess extends Action {
  type: 'FETCH_REPO_SUCCESS';
  payload: State['repo'];
}

export const fetchRepoSuccess = (payload: State['repo']): FetchRepoSuccess => ({
  type: 'FETCH_REPO_SUCCESS',
  payload
});
