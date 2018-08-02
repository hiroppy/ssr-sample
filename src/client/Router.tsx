import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { App } from './containers/App';

// render should be optional (TODO: submit PR)
const LoadableOrgs = Loadable({
  loader: () => import(/* webpackChunkName: "Orgs" */ './containers/Orgs').then((res) => res.Orgs),
  loading: () => <div>loading ...</div>
} as Loadable.OptionsWithoutRender<unknown>);

const LoadableTop = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Top" */ './components/pages/Top').then((res) => res.Top),
  loading: () => <div>loading ...</div>
} as Loadable.OptionsWithoutRender<unknown>);

export const Router = () => (
  <App>
    <Switch>
      <Route exact path="/" component={LoadableTop} />
      <Route path="/orgs/:org" component={LoadableOrgs} />
    </Switch>
  </App>
);
