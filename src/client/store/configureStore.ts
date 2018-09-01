import { createStore, applyMiddleware, compose, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

export const history = process.env.IS_BROWSER ? createBrowserHistory() : createMemoryHistory();
const sagaMiddleware = createSagaMiddleware();

const createEnhancer = () => {
  const appliedMiddlewares = applyMiddleware(sagaMiddleware, routerMiddleware(history));
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return composeEnhancers(appliedMiddlewares);
};

export const configureStore = (preloadedState: Object = {}) => {
  const enhancer = createEnhancer();
  const store: Store & {
    runSaga: SagaMiddleware<typeof rootSaga>['run'];
  } = createStore(connectRouter(history)(rootReducer), preloadedState, enhancer);

  sagaMiddleware.run(rootSaga);

  store.runSaga = sagaMiddleware.run;

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const { rootReducer: nextReducer } = require('../reducers');

      store.replaceReducer(connectRouter(history)(nextReducer));
    });
  }

  return store;
};
