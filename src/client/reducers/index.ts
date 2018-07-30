import { combineReducers } from 'redux';
import { reducer as usersReducer, State as UsersState } from './users';
import { reducer as reposReducer, State as ReposState } from './repos';

export interface State {
  users: UsersState;
  repos: ReposState;
}

export const rootReducer = combineReducers({
  users: usersReducer,
  repos: reposReducer
});
