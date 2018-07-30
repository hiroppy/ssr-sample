import { Actions } from '../actions/users';

export interface State {
  name: string;
}

export const initialState: State = {
  name: ''
};

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};
