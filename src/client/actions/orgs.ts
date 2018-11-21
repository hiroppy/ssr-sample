import { Action } from 'redux';
import { State } from '../reducers/orgs';

export type Actions = FetchRepos | FetchReposSuccess | FetchReposFailure | ResetOrgs;

export interface FetchRepos extends Action<'FETCH_REPOS'> {
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

export interface FetchReposSuccess extends Action<'FETCH_REPOS_SUCCESS'> {
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

export interface FetchReposFailure extends Action<'FETCH_REPOS_FAILURE'> {
  payload: {
    error: Error;
  };
}

export const fetchReposFailure = (error: Error): FetchReposFailure => ({
  type: 'FETCH_REPOS_FAILURE',
  payload: {
    error
  }
});

export interface ResetOrgs extends Action<'RESET_ORGS'> {}

export const resetOrgs = () => ({
  type: 'RESET_ORGS'
});
