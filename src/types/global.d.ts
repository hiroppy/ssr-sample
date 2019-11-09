interface Window {
  // eslint-disable-next-line
  __APOLLO_STATE__: any;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    IS_BROWSER: 'true' | undefined;
  }
}

// https://github.com/apollographql/apollo-link/issues/1131
declare type GlobalFetch = WindowOrWorkerGlobalScope;
