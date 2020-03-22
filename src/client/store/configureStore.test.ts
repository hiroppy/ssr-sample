import { END } from 'redux-saga';
import { configureStore } from './configureStore';

test('should provide history', async () => {
  // memoryHistory
  {
    const { history } = await import('./configureStore');

    expect(history.location).toHaveProperty('key');
  }

  jest.resetModules();

  // browserHistory
  {
    process.env.IS_BROWSER = 'true';

    const { history } = await import('./configureStore');

    expect(history.location).not.toHaveProperty('key');
  }
});

test('should have store and runSaga', () => {
  const { store, runSaga } = configureStore();

  expect(typeof store).toEqual('object');
  expect(typeof runSaga).toEqual('function');
});

describe('redux-saga', () => {
  let configureStore: any;
  let createSagaMiddleware: any;
  let spy: any;

  beforeEach(async () => {
    jest.resetModules();

    configureStore = (await import('./configureStore')).configureStore;
    createSagaMiddleware = await import('redux-saga');
    spy = jest.spyOn(createSagaMiddleware, 'default');
  });

  test('should create sagaMiddleware', async () => {
    configureStore();

    expect(spy).toBeCalled();
  });

  test('should run runSaga', async () => {
    process.env.IS_BROWSER = 'true';

    const { runSaga, store } = configureStore();
    const res = await Promise.race([
      runSaga(),
      new Promise((r) => setTimeout(() => r('quit'), 500)),
    ]);

    expect(res).toEqual('quit');
    store.dispatch(END);
  });
});
