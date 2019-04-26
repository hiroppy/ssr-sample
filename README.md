# A sample of Server-Side-Rendering and Single-Page-Application

[![Travis](https://img.shields.io/travis/hiroppy/ssr-sample/master.svg?style=flat-square)](https://travis-ci.org/hiroppy/ssr-sample)
[![Codecov](https://img.shields.io/codecov/c/github/hiroppy/ssr-sample.svg?style=flat-square)](https://codecov.io/gh/hiroppy/ssr-sample)

This repository shows you how to write SSR and SPA code using TypeScript.

## Articles

[業務で使える簡単な SSR + SPA のテンプレートを公開した](http://blog.hiroppy.me/entry/ssr-sample)

## Feature

- how to render at server side using Node.js ([/src/server](/src/server))
  - express
  - redux-saga (side effects)
  - styled-components (css)
  - react-helmet (head)
  - loadable-components (dynamic import)
- how to realize single page application ([/src/client](/src/client))
  - react-router
  - recompose (error handling, etc...)
  - App Shell and Content (PWA)
- how to use Apollo(GraphQL) with SSR and SPA
  - apollo-boost
  - apollo-server-express
  - react-apollo
- how to write test code and storybook
  - express, react, redux, redux-saga, react-router, etc...
- how to develop in the development env and how to run the production env
  - HMR of webpack
  - dotenv
  - manifest
  - load distribution
  - dynamic import
- how to measure application performance
  - why-did-you-update
  - autocannon
  - clinic
- Security
  - CSP(lv3, lv2)

## Libraries

| Name                | Purpose               | CSR | SSR |
| ------------------- | --------------------- | --- | --- |
| react               | view                  | yes | yes |
| redux               | architecure           | yes | yes |
| react-helmet        | head tag              | yes | yes |
| recompose           | HOC                   | yes | yes |
| redux-saga          | side effects          | yes | yes |
| styled-components   | CSS in JS             | yes | yes |
| loadable-components | dynamic import        | yes | yes |
| apollo-boost        | GraphQL               | yes | yes |
| express             | server side framework | N/A | yes |

| Name                | Purpose               |
| ------------------- | --------------------- |
| typescript, ts-node | language              |
| webpack             | bundler               |
| storybook           | preview               |
| jest                | test runner           |
| workbox             | service worker        |
| autocannon          | benchmarking tool     |
| clinic              | performance profiling |

## Global Variables

src: [src/server/controllers/renderer/renderer.tsx](src/server/controllers/renderer/renderer.tsx).

Use the following variables to pass data acquired by a server to the client side.

### `window.__LOADABLE_STATE__`

an article: https://blog.hiroppy.me/entry/loadable-components

This variable is used by [loadable-component](https://github.com/smooth-code/loadable-components).  
It has a JS asset's path of a page used at the page's entry point.

### `window.__APOLLO_STATE__`

This variable has GraphQL data which are fetched at the server.

### `data-json`

This script tag has data which are fetched via redux-saga, etc at the server.

## Pages

src: [src/client/components/pages/](src/client/components/pages/).

This application has 2 pages.

### Top

This page runs just graphql application.(excluding `header` and `base`)

src: [src/client/components/pages/Top](src/client/components/pages/Top)

- GraphQL using Apollo
  - Query: `organizations`, `author`
  - Mutation: `addOrganization`
    - [src/client/components/OrganizationsBox/OrganizationsBox.tsx](src/client/components/OrganizationsBox/OrganizationsBox.tsx)

#### SSR

Check `window.__APOLLO_STATE__` in HTML.

### Orgs

This page runs just redux-saga application.

page src: [src/client/components/pages/Orgs](src/client/components/pages/Orgs)  
saga src: [src/client/sagas/orgs.ts](src/client/sagas/orgs.ts)

- fetching using redux-saga

#### SSR

Check HTML and `<script id="initial-data" type="text/plain" data-json=...></script>`.

## Sagas

design concept: [gist](https://gist.github.com/hiroppy/9b5daf8da5cd639a62a917d536f5dfc5)  
src: [src/client/sagas/pages.ts](src/client/sagas/pages.ts)

These pages fork saga processes.

- `appProcess`
  - a common processing to execute on all pages(e.g. confirming login)
- pages
  - `loadTopPage`
    - just stop saga when it ran at a server
  - `loadOrgsPage`
    - fetching data and then stopping if it ran at a server

`appProcess` and `pages` run in parallel, also they run the same code in a server and client.

## Setup

```sh
$ git clone git@github.com:hiroppy/ssr-sample.git
$ cd ssr-sample
$ npm i
$ npm start
```

## Development

```sh
$ npm start                  # use 3000
$ open http://localhost:3000
$ npm run start:storybook    # use 6006
$ open http://localhost:6006
```

## GraphQL Playground

```sh
$ npm start
$ open http://localhost:3000/graphql
```

## Test

```sh
$ npm test
```

## Production

```sh
$ npm run build             # npm run build:client + npm run build:server
$ npm run start:prod        # run server and use 3000
$ open http://localhost8080
```

## Deploy

```sh
$ npm run deploy:storybook
```

## Note

This repository shows how to write and so does not introduce Atomic Design.
