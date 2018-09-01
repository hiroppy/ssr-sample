import { combineReducers } from 'redux';
import { reducer as usersReducer, State as UsersState } from './users';
import { reducer as orgsReducer, State as OrgsState } from './orgs';
import { reducer as pagesReducer, State as PagesState } from './pages';

export interface State {
  users: UsersState;
  orgs: OrgsState;
  pages: PagesState;
}

export const rootReducer = combineReducers({
  users: usersReducer,
  orgs: orgsReducer,
  pages: pagesReducer
});
