import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { loadComponents } from 'loadable-components';

// graphql
import { ApolloProvider } from 'react-apollo';
import { client } from '../graphql/client';

import { configureStore, history } from './store/configureStore';
import { Router } from './Router'; // this needs to be at the top level because it's used by loadable-components

if (process.env.NODE_ENV !== 'production' && process.env.IS_BROWSER) {
  const { whyDidYouUpdate } = require('why-did-you-update');

  whyDidYouUpdate(React);
}

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/public/service-worker.js');
  });
}

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const initialData = JSON.parse(document.getElementById('initial-data')!.getAttribute('data-json')!);
const store = configureStore(initialData);

const render = (RouterComponent: typeof Router) => {
  renderMethod(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RouterComponent />
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>,
    document.getElementById('root')
  );
};

loadComponents().then(() => {
  render(Router);
});

if (module.hot) {
  module.hot.accept('./Router', () => {
    const { Router: RouterComponent }: { Router: typeof Router } = require('./Router');

    render(RouterComponent);
  });
}
