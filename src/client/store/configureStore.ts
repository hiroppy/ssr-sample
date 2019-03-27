import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

export const history = process.env.IS_BROWSER ? createBrowserHistory() : createMemoryHistory();
const sagaMiddleware = createSagaMiddleware();

const createEnhancer = () => {
  const composeEnhancers = composeWithDevTools({});

  return composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)));
};

export const runSaga = async () => {
  return sagaMiddleware.run(rootSaga).toPromise();
};

export const configureStore = (preloadedState: Object = {}) => {
  const enhancer = createEnhancer();
  const store = createStore(connectRouter(history)(rootReducer), preloadedState, enhancer);

  runSaga();

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
