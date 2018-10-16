# A sample of Server-Side-Rendering and Single Page Application

[![Travis (.org)](https://img.shields.io/travis/hiroppy/ssr-sample.svg?style=flat-square)](https://travis-ci.org/hiroppy/ssr-sample)
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

## Libraries

### dependencies

- react@16
- react-router-dom@4
- react-helmet@5
- recompose@0.33
- redux@4
- redux-saga@0.16
- connected-react-router@4
- loadable-components@2
- styled-components@3
- apollo-boost@0.1
- express@4
- dotenv@6

### devDependencies

- typescript@3
- storybook@4.0.0-alpha.9
- jest@23
- ts-node@
- webpack@4
- workbox@3

## Setup

```sh
$ git clone git@github.com:hiroppy/ssr-sample.git
$ npm i
$ npm start
```

## Development

```sh
$ npm start # use 3000
$ open http://localhost:3000
$ npm run start:storybook # use 6006
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
$ npm run build # for client codes
$ npm run start:prod # run server and use 3000
$ open http://localhost8080
```

## Deploy

```sh
$ npm run deploy:storybook
```

## Note

This repository shows how to write and so does not introduce Atomic Design.
