import { Actions } from '../actions/orgs';

export interface State {
  name: string;
  repos: Array<{
    url: string;
    name: string;
    language: string;
    forksCount: number;
    issuesCount: number;
    stargazersCount: number;
    watchersCount: number;
  }>;
  isFetching: boolean;
}

export const initialState: State = {
  name: '',
  repos: [],
  isFetching: false
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'FETCH_REPOS':
      return { ...state, isFetching: true };
    case 'FETCH_REPOS_SUCCESS':
      return { ...state, isFetching: false, ...action.payload };
    case 'RESET_ORGS':
      return initialState;
    default:
      return state;
  }
};
