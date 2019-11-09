import { createStore } from 'redux';
import { rootReducer } from '.';
import { reducer as pagesReducer } from './pages';
import { reducer as sagaPageReducer } from './sagaPage';

const store = createStore(rootReducer);

test('should return rootReducer', () => {
  expect(store.getState().pages).toEqual(pagesReducer(undefined, { type: undefined } as any));
  expect(store.getState().sagaPage).toEqual(sagaPageReducer(undefined, { type: undefined } as any));
});
