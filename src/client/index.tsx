import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store/configureStore';

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const initialData = JSON.parse(document.getElementById('initial-data')!.getAttribute('data-json')!);
const store = configureStore(initialData);

const render = () => {
  const { Router } = require('./Router');

  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./Router', () => {
    render();
  });
}

render();
