import { END } from 'redux-saga';
import { expectSaga } from 'redux-saga-test-plan';
import { pagesProcess } from './pages';
import * as actions from '../actions/pages';
import * as fetchSagaActions from '../actions/fetchSaga';
import { initialState } from '../reducers/pages';
import { sagaSamples } from '../../server/responseSchema';

describe('LOAD_APP_PROCESS', () => {
  test('should call LOAD_APP_PROCESS_SUCCESS action', () => {
    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(actions.setEnv('test'))
      .put(actions.loadAppProcessSuccess())
      .dispatch(actions.loadAppProcess())
      .silentRun();
  });
});

describe('LOAD_TOP_PAGE', () => {
  test('should call LOAD_TOP_PAGE_SUCCESS with SSR', () => {
    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(actions.loadTopPageSuccess())
      .put(END)
      .dispatch(actions.loadTopPage())
      .silentRun();
  });

  test('should call LOAD_TOP_PAGE_SUCCESS action with CSR', () => {
    process.env.IS_BROWSER = 'true';

    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(actions.loadTopPageSuccess())
      .dispatch(actions.loadTopPage())
      .silentRun();
  });
});

describe('LOAD_SAGA_PAGE', () => {
  test('should call LOAD_SAGA_PAGE_SUCCESS with SSR', () => {
    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(actions.loadSagaPageSuccess())
      .put(END)
      .dispatch(actions.loadSagaPage('1'))
      .dispatch(fetchSagaActions.fetchSagaCodeSuccess(sagaSamples))
      .silentRun();
  });

  test('should call LOAD_SAGA_PAGE_FAILURE with SSR', () => {
    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(actions.loadSagaPageFailure(new Error()))
      .put(END)
      .dispatch(actions.loadSagaPage('1'))
      .dispatch(fetchSagaActions.fetchSagaCodeFailure(new Error()))
      .silentRun();
  });

  test("shouldn't call END when CSR", () => {
    process.env.IS_BROWSER = 'true';

    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(actions.loadSagaPageSuccess())
      .dispatch(actions.loadSagaPage('1'))
      .dispatch(fetchSagaActions.fetchSagaCodeSuccess(sagaSamples))
      .silentRun();
  });
});

describe('LOAD_APOLLO_PAGE', () => {
  test('should call LOAD_APOLLO_PAGE_SUCCESS with SSR', () => {
    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(actions.loadApolloPageSuccess())
      .put(END)
      .dispatch(actions.loadApolloPage())
      .silentRun();
  });

  test('should call LOAD_APOLLO_PAGE_SUCCESS action with CSR', () => {
    process.env.IS_BROWSER = 'true';

    return expectSaga(pagesProcess)
      .withState(initialState)
      .put(actions.loadApolloPageSuccess())
      .dispatch(actions.loadApolloPage())
      .silentRun();
  });
});
