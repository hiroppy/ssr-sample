import { combineReducers } from 'redux';
import {
  reducer as pagesReducer,
  initialState as pagesInitialState,
  State as PagesState,
} from './pages';
import {
  reducer as sagaPageReducer,
  initialState as sagaPageInitialState,
  State as SagaPageState,
} from './sagaPage';

export type State = {
  pages: PagesState;
  sagaPage: SagaPageState;
};

export const initialState = {
  pages: pagesInitialState,
  sagaPage: sagaPageInitialState,
};

export const rootReducer = combineReducers({
  pages: pagesReducer,
  sagaPage: sagaPageReducer,
});
