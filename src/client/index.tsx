import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { configureStore } from './store/configureStore';

// const renderMethod = ReactDOM.hydrate;
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const initialData = JSON.parse(document.getElementById('initial-data')!.getAttribute('data-json')!);
const store = configureStore(initialData);

if (module.hot) {
  module.hot.accept();
  // module.hot.accept('./reducers', () => {
  //   const nextRootReducer = require('./reducers');
  //   store.replaceReducer(nextRootReducer);
  // });
}

renderMethod(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
