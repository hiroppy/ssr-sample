import loadable from '@loadable/component';

export const LoadableTopPage = loadable(() =>
  import(/* webpackPrefetch: true */ '../components/pages/Top')
);

export const LoadableSagaPage = loadable(() =>
  import(/* webpackPrefetch: true */ '../components/pages/Saga')
);

export const LoadableApolloPage = loadable(() =>
  import(/* webpackPrefetch: true */ '../components/pages/Apollo')
);

export const LoadableNotFoundPage = loadable(() => import('../components/pages/NotFound'));
