import { Actions } from '../actions/pages';

export type State = {
  isLoadingCompletion: boolean;
  error: Error | null;
  baseUrl: string;
  env: typeof process.env.NODE_ENV;
};

export const initialState: State = {
  isLoadingCompletion: false,
  error: null,
  baseUrl: '',
  env: 'development'
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'SET_ENV':
      return { ...state, env: action.payload.env };
    case 'RESET_PAGES_STATUS':
      return initialState;
    case 'SET_BASE_URL':
      return { ...state, baseUrl: action.payload.baseUrl };
    case 'LOAD_TOP_PAGE':
    case 'LOAD_SAGA_PAGE':
    case 'LOAD_APOLLO_PAGE':
      return { ...state, isLoadingCompletion: false };
    case 'LOAD_TOP_PAGE_SUCCESS':
    case 'LOAD_SAGA_PAGE_SUCCESS':
    case 'LOAD_APOLLO_PAGE_SUCCESS':
      return { ...state, isLoadingCompletion: true };
    case 'LOAD_TOP_PAGE_FAILURE':
    case 'LOAD_SAGA_PAGE_FAILURE':
    case 'LOAD_APOLLO_PAGE_FAILURE':
      return { ...state, isLoadingCompletion: true, error: action.payload.err };
    default:
      return state;
  }
};
