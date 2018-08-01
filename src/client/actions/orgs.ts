import { Action } from 'redux';
import { State } from '../reducers/orgs';

export type Actions = FetchRepos | FetchReposSuccess | ResetOrgs;

export interface FetchRepos extends Action {
  type: 'FETCH_REPOS';
  payload: {
    org: string;
  };
}

export const fetchRepos = (org: FetchRepos['payload']['org']): FetchRepos => ({
  type: 'FETCH_REPOS',
  payload: {
    org
  }
});

export interface FetchReposSuccess extends Action {
  type: 'FETCH_REPOS_SUCCESS';
  payload: {
    name: string;
    repos: State['repos'];
  };
}

export const fetchReposSuccess = ({
  name,
  repos
}: FetchReposSuccess['payload']): FetchReposSuccess => ({
  type: 'FETCH_REPOS_SUCCESS',
  payload: {
    name,
    repos
  }
});

export interface ResetOrgs extends Action {
  type: 'RESET_ORGS';
}

export const resetOrgs = () => ({
  type: 'RESET_ORGS'
});
