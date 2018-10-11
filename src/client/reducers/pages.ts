import { Actions } from '../actions/pages';

export interface State {
  isLoadingCompletion: boolean;
  error: Error | null;
}

export const initialState: State = {
  isLoadingCompletion: false,
  error: null
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'RESET_PAGES_STATUS':
      return initialState;
    case 'LOAD_TOP_PAGE':
    case 'LOAD_ORGS_PAGE':
      return { ...state, isLoadingCompletion: false };
    case 'LOAD_TOP_PAGE_SUCCESS':
    case 'LOAD_ORGS_PAGE_SUCCESS':
      return { ...state, isLoadingCompletion: true };
    case 'LOAD_TOP_PAGE_FAILURE':
    case 'LOAD_ORGS_PAGE_FAILURE':
      return { ...state, isLoadingCompletion: true, error: action.payload.err };
    default:
      return state;
  }
};
