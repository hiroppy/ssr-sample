import loadable from '@loadable/component';

export const LoadableOrgs = loadable(
  // @ts-ignore
  () => import(/* webpackChunkName: "Orgs" */ '../containers/Orgs').then(({ Orgs }) => Orgs)
);

export const LoadableTop = loadable(
  // @ts-ignore
  () => import(/* webpackChunkName: "Top" */ '../containers/Top').then(({ Top }) => Top)
);

export const LoadableNotFound = loadable(() =>
  // @ts-ignore
  import(/* webpackChunkName: "404", webpackPrefetch: true */ '../containers/NotFound').then(
    ({ NotFound }) => NotFound
  )
);
