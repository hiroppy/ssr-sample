import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  LoadableTopPage,
  LoadableSagaPage,
  LoadableApolloPage,
  LoadableNotFoundPage,
} from './routes';
import { App } from '../components/App';

export const Router = () => (
  <App>
    <Switch>
      <Route exact path="/">
        <LoadableTopPage />
      </Route>
      <Route path="/saga">
        <LoadableSagaPage />
      </Route>
      <Route path="/apollo">
        <LoadableApolloPage />
      </Route>
      <Route>
        <LoadableNotFoundPage />
      </Route>
    </Switch>
  </App>
);
