import { reducer, initialState } from './pages';
import * as actions from '../actions/pages';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined } as any)).toEqual(initialState);
});

test('should handle RESET_PAGES_STATUS', () => {
  expect(
    reducer({ ...initialState, baseUrl: 'test' }, actions.resetPageStatus())
  ).toMatchSnapshot();
});

test('should handle SET_ENV', () => {
  expect(reducer(initialState, actions.setEnv('test'))).toMatchSnapshot();
});

test('should handle SET_BASE_URL', () => {
  expect(reducer(initialState, actions.setBaseUrl('base-url'))).toMatchSnapshot();
});

test('should handle LOAD_TOP_PAGE', () => {
  expect(reducer(initialState, actions.loadTopPage())).toMatchSnapshot();
});

test('should handle LOAD_TOP_PAGE_SUCCESS', () => {
  expect(reducer(initialState, actions.loadTopPageSuccess())).toMatchSnapshot();
});

test('should handle LOAD_TOP_PAGE_FAILURE', () => {
  expect(reducer(initialState, actions.loadTopPageFailure(new Error('404')))).toMatchSnapshot();
});

test('should handle LOAD_SAGA_PAGE', () => {
  expect(reducer(initialState, actions.loadSagaPage('len'))).toMatchSnapshot();
});

test('should handle LOAD_SAGA_PAGE_SUCCESS', () => {
  expect(reducer(initialState, actions.loadSagaPageSuccess())).toMatchSnapshot();
});

test('should handle LOAD_SAGA_PAGE_FAILURE', () => {
  expect(reducer(initialState, actions.loadSagaPageFailure(new Error('404')))).toMatchSnapshot();
});

test('should handle LOAD_APOLLO_PAGE', () => {
  expect(reducer(initialState, actions.loadApolloPage())).toMatchSnapshot();
});

test('should handle LOAD_APOLLO_PAGE_SUCCESS', () => {
  expect(reducer(initialState, actions.loadApolloPageSuccess())).toMatchSnapshot();
});

test('should handle LOAD_APOLLO_PAGE_FAILURE', () => {
  expect(reducer(initialState, actions.loadApolloPageFailure(new Error('404')))).toMatchSnapshot();
});
