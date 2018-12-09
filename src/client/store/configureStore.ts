import { createStore, applyMiddleware, compose, Store } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

export const history = process.env.IS_BROWSER ? createBrowserHistory() : createMemoryHistory();
const sagaMiddleware = createSagaMiddleware();

const createEnhancer = () => {
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)));
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
      const {
        rootReducer: nextReducer
      }: { rootReducer: typeof rootReducer } = require('../reducers');

      store.replaceReducer(connectRouter(history)(nextReducer));
    });
  }

  return store;
};
