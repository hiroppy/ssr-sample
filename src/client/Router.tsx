import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App } from './containers/App';
import { Top } from './components/pages/Top';
import { Repo } from './containers/Repo';

export const Router = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Top} />
      <Route path="/repos/:org/:name" component={Repo} />
    </Switch>
  </App>
);
