# Server-Side-Rendering Sample

[![Travis (.org)](https://img.shields.io/travis/hiroppy/ssr-sample.svg?style=flat-square)](https://travis-ci.org/hiroppy/ssr-sample)
[![Codecov](https://img.shields.io/codecov/c/github/hiroppy/ssr-sample.svg?style=flat-square)](https://codecov.io/gh/hiroppy/ssr-sample)

This repository shows you how to write SSR and SPA code using TypeScript.

## Articles

[業務で使える簡単な SSR + SPA のテンプレートを公開した](http://blog.hiroppy.me/entry/ssr-sample)

## Feature

- how to render at server side using Node.js
  - redux-saga (side effects)
  - styled-components (css)
  - react-helmet (head)
  - react-loadable(probably replaced by loadable-components)
- How to realize single page application
  - react-router
  - dynamic import
  - App Shell and Content
- how to write test code and storybook
  - express, react, redux, redux-saga, react-router, etc...
- how to develop in the development env and how to run the production env
  - HMR of webpack
  - dotenv
  - manifest
  - load distribution

## Libraries

### dependencies

- react@16
- react-router-dom@4
- react-helmet@5
- react-loadable@5
- redux@4
- redux-saga@0.16
- styled-components@3
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
$ npm run start:storybook # use 6006
```

## Test

```sh
$ npm test
```

## Production

```sh
$ npm run build # for client codes
$ npm run start:prod # run server and use 3000
```

## Deploy

```sh
$ npm run deploy:storybook
```

## Note

This repository shows how to write and so does not introduce Atomic Design.
