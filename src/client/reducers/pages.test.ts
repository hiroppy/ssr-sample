import { reducer } from './pages';
import {
  resetPageStatus,
  loadTopPage,
  loadTopPageSuccess,
  loadTopPageFailure,
  loadOrgsPage,
  loadOrgsPageSuccess,
  loadOrgsPageFailure
} from '../actions/pages';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined } as any)).toMatchSnapshot();
});

test('should handle RESET_PAGES_STATUS', () => {
  expect(reducer({ isLoadingCompletion: true, error: null }, resetPageStatus())).toMatchSnapshot();
});

test('should handle LOAD_TOP_PAGE', () => {
  expect(reducer(undefined, loadTopPage())).toMatchSnapshot();
});

test('should handle LOAD_TOP_PAGE_SUCCESS', () => {
  expect(
    reducer({ isLoadingCompletion: true, error: null }, loadTopPageSuccess())
  ).toMatchSnapshot();
});

test('should handle LOAD_TOP_PAGE_FAILURE', () => {
  expect(reducer(undefined, loadTopPageFailure(new Error('404')))).toMatchSnapshot();
});

test('should handle LOAD_ORGS_PAGE', () => {
  expect(reducer(undefined, loadOrgsPage('foo'))).toMatchSnapshot();
});

test('should handle LOAD_ORGS_PAGE_SUCCESS', () => {
  expect(
    reducer({ isLoadingCompletion: true, error: null }, loadOrgsPageSuccess())
  ).toMatchSnapshot();
});

test('should handle LOAD_ORGS_PAGE_FAILURE', () => {
  expect(reducer(undefined, loadOrgsPageFailure(new Error('404')))).toMatchSnapshot();
});
