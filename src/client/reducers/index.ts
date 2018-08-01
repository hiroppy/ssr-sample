import { combineReducers } from 'redux';
import { reducer as usersReducer, State as UsersState } from './users';
import { reducer as orgsReducer, State as OrgsState } from './orgs';

export interface State {
  users: UsersState;
  orgs: OrgsState;
}

export const rootReducer = combineReducers({
  users: usersReducer,
  orgs: orgsReducer
});
