import { reducer } from './pages';
import { loadOrgsPageFailure, loadTopPageFailure } from '../actions/pages';

const customState = {
  isLoadingCompletion: false
};

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toMatchSnapshot();
});

test('should handle RESET_PAGES_STATUS', () => {
  expect(
    reducer({ isLoadingCompletion: true, error: null }, { type: 'RESET_PAGES_STATUS' })
  ).toMatchSnapshot();
});

test('should handle LOAD_TOP_PAGE', () => {
  expect(reducer(undefined, { type: 'LOAD_TOP_PAGE' })).toMatchSnapshot();
});

test('should handle LOAD_TOP_PAGE_SUCCESS', () => {
  expect(
    reducer({ isLoadingCompletion: true, error: null }, { type: 'LOAD_TOP_PAGE_SUCCESS' })
  ).toMatchSnapshot();
});

test('should handle LOAD_TOP_PAGE_FAILURE', () => {
  expect(reducer(undefined, loadTopPageFailure(new Error('404')))).toMatchSnapshot();
});

test('should handle LOAD_ORGS_PAGE', () => {
  expect(reducer(undefined, { type: 'LOAD_ORGS_PAGE', payload: { org: 'foo' } })).toMatchSnapshot();
});

test('should handle LOAD_ORGS_PAGE_SUCCESS', () => {
  expect(
    reducer({ isLoadingCompletion: true, error: null }, { type: 'LOAD_ORGS_PAGE_SUCCESS' })
  ).toMatchSnapshot();
});

test('should handle LOAD_ORGS_PAGE_FAILURE', () => {
  expect(reducer(undefined, loadOrgsPageFailure(new Error('404')))).toMatchSnapshot();
});
