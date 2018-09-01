import { END } from 'redux-saga';
import { expectSaga } from 'redux-saga-test-plan';
import { pagesProcess } from './pages';
import {
  loadOrgsPage,
  loadOrgsPageSuccess,
  loadOrgsPageFailure,
  loadTopPage,
  loadTopPageSuccess
} from '../actions/pages';
import { resetOrgs, fetchRepos, fetchReposSuccess, fetchReposFailure } from '../actions/orgs';

afterEach(() => {
  delete process.env.IS_BROWSER;
});

const initialState = {
  isLoadingCompletion: false,
  orgs: {
    name: 'foo'
  }
};

test('should take on the LOAD_TOP_PAGE action when SSR', () => {
  return expectSaga(pagesProcess)
    .withState(initialState)
    .put(loadTopPageSuccess())
    .put(END)
    .dispatch(loadTopPage())
    .run();
});

test('should take on the LOAD_TOP_PAGE action when CSR', () => {
  process.env.IS_BROWSER = 'true';

  return expectSaga(pagesProcess)
    .withState(initialState)
    .put(loadTopPageSuccess())
    .dispatch(loadTopPage())
    .run();
});

test('should take on the LOAD_TOP_PAGE action when SSR', () => {
  return expectSaga(pagesProcess)
    .withState(initialState)
    .put(END)
    .put(loadTopPageSuccess())
    .dispatch(loadTopPage())
    .run();
});

test('should take on the LOAD_ORGS_PAGE action when SSR', () => {
  return expectSaga(pagesProcess)
    .withState(initialState)
    .put(loadOrgsPageSuccess())
    .put(END)
    .dispatch(loadOrgsPage('foo')) // make it the same name as initialState
    .run();
});

test('should take on the LOAD_ORGS_PAGE action when CSR', () => {
  process.env.IS_BROWSER = 'true';

  return expectSaga(pagesProcess)
    .withState(initialState)
    .put(resetOrgs())
    .put(fetchRepos('bar'))
    .put(loadOrgsPageSuccess())
    .dispatch(loadOrgsPage('bar'))
    .dispatch(
      fetchReposSuccess({
        name: 'bar',
        repos: []
      })
    )
    .run();
});

test('should take on the LOAD_ORGS_PAGE action when getting 404 with CSR', () => {
  process.env.IS_BROWSER = 'true';

  return expectSaga(pagesProcess)
    .withState(initialState)
    .put(resetOrgs())
    .put(fetchRepos('bar'))
    .put(loadOrgsPageFailure())
    .dispatch(loadOrgsPage('bar'))
    .dispatch(fetchReposFailure(404))
    .run();
});

test('should take on the LOAD_ORGS_PAGE action when getting 403 with CSR', () => {
  process.env.IS_BROWSER = 'true';

  return expectSaga(pagesProcess)
    .withState(initialState)
    .put(resetOrgs())
    .put(fetchRepos('bar'))
    .put(loadOrgsPageFailure())
    .dispatch(loadOrgsPage('bar'))
    .dispatch(fetchReposFailure(403))
    .run();
});
