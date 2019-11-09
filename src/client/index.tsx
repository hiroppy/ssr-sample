/* eslint @typescript-eslint/no-non-null-assertion: 0 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-boost';
import { createClient } from '../graphql/client';
import { endpoint } from '../graphql/constants';
import { configureStore } from './store/configureStore';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const initialData = JSON.parse(document.getElementById('initial-data')!.getAttribute('data-json')!);
const { store } = configureStore(initialData);
const client = createClient({ link: new HttpLink({ uri: endpoint }) });

const render = async () => {
  const { Router } = await import(/* webpackMode: "eager" */ './router');

  renderMethod(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root')
  );
};

loadableReady(() => {
  render();
});

if (module.hot) {
  module.hot.accept('./router', () => {
    render();
  });
}
