import loadable from 'loadable-components';

export const LoadableOrgs = loadable(
  () => import(/* webpackChunkName: "Orgs" */ '../containers/Orgs').then(({ Orgs }) => Orgs),
  {
    modules: ['../containers/Orgs']
  }
);

export const LoadableTop = loadable(
  () => import(/* webpackChunkName: "Top" */ '../containers/Top').then(({ Top }) => Top),
  {
    modules: ['../containers/Top']
  }
);

export const LoadableNotFound = loadable(
  () =>
    import(/* webpackChunkName: "404" */ '../containers/NotFound').then(({ NotFound }) => NotFound),
  {
    modules: ['../containers/NotFound']
  }
);
