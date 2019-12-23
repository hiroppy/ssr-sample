import { resolve } from 'path';
import { Request, Response } from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup, renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { ChunkExtractor } from '@loadable/server';
import { ApolloProvider, getMarkupFromTree } from 'react-apollo';
import { SchemaLink } from 'apollo-link-schema';
import { renderFullPage } from '../../renderFullPage';
import { Router } from '../../../client/router/index';
import { configureStore } from '../../../client/store/configureStore';
import { createClient } from '../../../graphql/client';
import { schema } from '../../../graphql/schema';
import { setBaseUrl } from '../../../client/actions/pages';

const escape = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

const statsFile = resolve(
  __dirname,
  process.env.NODE_ENV !== 'production'
    ? '../../../../dist/client/loadable-stats.json'
    : '../../../../client/loadable-stats.json'
);

export async function get(req: Request, res: Response) {
  const baseUrl = `${req.protocol}://${req.get('Host')}`;
  const { nonce }: { nonce: string } = res.locals;
  const { store, runSaga } = configureStore();
  const client = createClient({ link: new SchemaLink({ schema }) });
  const sheet = new ServerStyleSheet();
  const context = {};

  // for Node.js because `fetch` requires absolute URLs
  store.dispatch(setBaseUrl(baseUrl));

  const App = () => (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {/* add `div` because of `hydrate` */}
          <Router />
        </StaticRouter>
      </Provider>
    </ApolloProvider>
  );
  runSaga();

  const preloadedState = JSON.stringify(store.getState());
  const graphql = JSON.stringify(client.extract());

  const extractor = new ChunkExtractor({ statsFile });
  const tree = extractor.collectChunks(<App />);
  const scripts = extractor.getScriptTags({ nonce });
  const helmetContent = Helmet.renderStatic();
  const meta = `
      ${helmetContent.meta.toString()}
      ${helmetContent.title.toString()}
    `.trim();
  await Promise.all([
    // kick apollo, redux-saga, and styled-components
    getMarkupFromTree({
      tree,
      renderFunction: renderToStaticMarkup
    }),
    runSaga()
  ]);
  res.write(`<!DOCTYPE html><html lang="en"><head>
    <meta charSet="UTF-8" />
    <meta name="Description" content="introducing SPA and SSR">
    <meta property="csp-nonce" content="${nonce}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${meta}
    </head><body><script nonce="${nonce}" id="initial-data" type="text/plain" data-json="${escape(
    preloadedState
  )}"></script>
  <script nonce="${nonce}">window.__APOLLO_STATE__=${graphql}</script>
  ${scripts}

  `);
  res.write("<div id='root'>");
  const jsx = sheet.collectStyles(tree);

  const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx));
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.write('</body></html>');
    res.end();
  });
}
