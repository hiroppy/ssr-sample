import { resolve } from 'path';
import { Request, Response } from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
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
          <div id="root">
            <Router />
          </div>
        </StaticRouter>
      </Provider>
    </ApolloProvider>
  );

  try {
    const extractor = new ChunkExtractor({ statsFile });
    const tree = extractor.collectChunks(<App />);

    await Promise.all([
      // kick apollo, redux-saga, and styled-components
      getMarkupFromTree({
        tree,
        renderFunction: renderToStaticMarkup
      }),
      runSaga()
    ]);

    const body = renderToString(tree);
    const preloadedState = JSON.stringify(store.getState());
    const helmetContent = Helmet.renderStatic();
    const meta = `
      ${helmetContent.meta.toString()}
      ${helmetContent.title.toString()}
    `.trim();
    const style = sheet.getStyleTags();
    const scripts = extractor.getScriptTags({ nonce });
    const graphql = JSON.stringify(client.extract());

    return res.send(renderFullPage({ meta, body, style, preloadedState, scripts, graphql, nonce }));
  } catch (e) {
    console.error(e);
    return res.status(500).send(e.message);
  }
}
