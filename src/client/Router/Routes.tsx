import * as React from 'react';
import * as Loadable from 'react-loadable';

// `render` should be optional (TODO: submit PR)
export const LoadableOrgs = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Orgs" */ '../containers/Orgs').then(({ Orgs }) => Orgs),
  loading: () => <div />
} as Loadable.OptionsWithoutRender<unknown>);

export const LoadableTop = Loadable({
  loader: () => import(/* webpackChunkName: "Top" */ '../containers/Top').then(({ Top }) => Top),
  loading: () => <div />
} as Loadable.OptionsWithoutRender<unknown>);

export const LoadableNotFound = Loadable({
  loader: () =>
    import(/* webpackChunkName: "404" */ '../containers/NotFound').then(({ NotFound }) => NotFound),
  loading: () => <div />
} as Loadable.OptionsWithoutRender<unknown>);
