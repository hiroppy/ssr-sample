import { Actions } from '../actions/repos';

export interface State {
  repo: {
    url: string;
    fullName: string;
    language: string;
    homepage: string;
    forksCount: number;
    issuesCount: number;
    stargazersCount: number;
    subscribersCount: number;
    watchersCount: number;
  };
}

export const initialState: State = {
  repo: {
    url: '',
    fullName: '',
    language: '',
    homepage: '',
    forksCount: 0,
    issuesCount: 0,
    stargazersCount: 0,
    subscribersCount: 0,
    watchersCount: 0
  }
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'FETCH_REPO_SUCCESS':
      return { ...state, repo: action.payload };
    default:
      return state;
  }
};
