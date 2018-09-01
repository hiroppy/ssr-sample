import { Actions } from '../actions/pages';

export interface State {
  isLoadingCompletion: boolean;
}

export const initialState: State = {
  isLoadingCompletion: false
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'RESET_PAGES_STATUS':
      return initialState;
    case 'LOAD_TOP_PAGE':
    case 'LOAD_ORGS_PAGE':
      return { ...state, isLoadingCompletion: false };
    case 'LOAD_ERROR_PAGE':
    case 'LOAD_TOP_PAGE_SUCCESS':
    case 'LOAD_ORGS_PAGE_SUCCESS':
      return { ...state, isLoadingCompletion: true };
    default:
      return state;
  }
};
