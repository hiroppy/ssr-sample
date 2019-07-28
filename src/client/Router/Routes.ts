import loadable from 'loadable-components';

// don't use named import
// https://github.com/hiroppy/ssr-sample/issues/166

export const LoadableOrgs = loadable(
  () => import(/* webpackChunkName: "Orgs" */ '../containers/Orgs'),
  {
    modules: ['../containers/Orgs']
  }
);

export const LoadableTop = loadable(
  () => import(/* webpackChunkName: "Top" */ '../containers/Top'),
  {
    modules: ['../containers/Top']
  }
);

export const LoadableNotFound = loadable(
  () => import(/* webpackChunkName: "404", webpackPrefetch: true */ '../containers/NotFound'),
  {
    modules: ['../containers/NotFound']
  }
);
