import { createStore } from 'redux';
import { rootReducer } from '.';
import { reducer as orgsReducer } from './orgs';
import { reducer as usersReducer } from './users';

const store = createStore(rootReducer);

test('should return rootReducer', () => {
  expect(store.getState().orgs).toEqual(orgsReducer(undefined, { type: undefined } as any));
  expect(store.getState().users).toEqual(usersReducer(undefined, { type: undefined } as any));
});
