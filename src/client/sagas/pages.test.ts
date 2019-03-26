import { END } from 'redux-saga';
import { expectSaga } from 'redux-saga-test-plan';
import { pagesProcess } from './pages';
import {
  loadAppProcess,
  loadAppProcessSuccess,
  loadAppProcessFailure,
  loadOrgsPage,
  loadOrgsPageSuccess,
  loadOrgsPageFailure,
  loadTopPage,
  loadTopPageSuccess,
  stopSaga,
  resetPageStatus
} from '../actions/pages';
import { setUserName } from '../actions/users';
import { resetOrgs, fetchRepos, fetchReposSuccess, fetchReposFailure } from '../actions/orgs';

afterEach(() => {
  delete process.env.IS_BROWSER;
});

const initialState = {
  isLoadingCompletion: false,
  orgs: {
    name: 'foo'
  },
  users: {
    name: ''
  }
};

describe('LOAD_APP_PROCESS', () => {
  test('should call LOAD_APP_PROCESS_SUCCESS action', () => {
    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(setUserName('hiroppy'))
      .put(loadAppProcessSuccess())
      .dispatch(loadAppProcess())
      .silentRun();
  });
});

describe('LOAD_TOP_PAGE', () => {
  test('should call LOAD_TOP_PAGE_SUCCESS with SSR', () => {
    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(loadTopPageSuccess())
      .put(END)
      .dispatch(loadTopPage())
      .silentRun();
  });

  test('should call LOAD_TOP_PAGE_SUCCESS action with CSR', () => {
    process.env.IS_BROWSER = 'true';

    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(loadTopPageSuccess())
      .dispatch(loadTopPage())
      .silentRun();
  });
});

describe('LOAD_ORGS_PAGE', () => {
  test('should call LOAD_ORGS_PAGE_SUCCESS action with SSR', () => {
    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(loadOrgsPageSuccess())
      .put(END)
      .dispatch(loadOrgsPage('foo')) // make it the same name as initialState
      .silentRun();
  });

  test('should call LOAD_ORGS_PAGE_SUCCESS action with CSR', () => {
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
      .silentRun();
  });

  test('should call LOAD_ORGS_PAGE_FAILURE action when getting 404 with CSR', () => {
    process.env.IS_BROWSER = 'true';

    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(resetOrgs())
      .put(fetchRepos('bar'))
      .dispatch(loadOrgsPage('bar'))
      .dispatch(fetchReposFailure(new Error('404')))
      .silentRun();
  });

  test('should call LOAD_ORGS_PAGE action when getting 403 with CSR', () => {
    process.env.IS_BROWSER = 'true';

    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(resetOrgs())
      .put(fetchRepos('bar'))
      .dispatch(loadOrgsPage('bar'))
      .dispatch(fetchReposFailure(new Error('403')))
      .silentRun();
  });
});

describe('STOP_SAGA', () => {
  test('should call END action', () => {
    return expectSaga(pagesProcess)
      .put(END)
      .dispatch(stopSaga())
      .silentRun();
  });
});

describe('@@router/LOCATION_CHANGE', () => {
  test('should call RESET_PAGE_STATUS action', () => {
    return expectSaga(pagesProcess)
      .put(resetPageStatus())
      .dispatch({ type: '@@router/LOCATION_CHANGE' })
      .silentRun();
  });
});
