import { createStore, applyMiddleware, compose, Store } from 'redux';
import createSagaMiddleware, { END, SagaMiddleware } from 'redux-saga';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const createEnhancer = () => {
  const appliedMiddlewares = applyMiddleware(sagaMiddleware);
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  return composeEnhancers(appliedMiddlewares);
};

export const configureStore = (preloadedState: Object = {}) => {
  const enhancer = createEnhancer();
  const store: Store & {
    runSaga: SagaMiddleware<typeof rootSaga>['run'];
    close: () => void;
  } = createStore(rootReducer, preloadedState, enhancer);

  sagaMiddleware.run(rootSaga);

  store.runSaga = sagaMiddleware.run;
  store.close = () => {
    store.dispatch(END);
  };

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const { rootReducer: nextReducer } = require('../reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
