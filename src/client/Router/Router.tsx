import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App } from '../containers/App';
import { LoadableTop, LoadableOrgs } from './Routes';

export const Router = () => (
  <App>
    <Switch>
      <Route exact path="/" component={LoadableTop} />
      <Route path="/orgs/:org" component={LoadableOrgs} />
    </Switch>
  </App>
);
