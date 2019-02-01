// renderToNodeStream
// https://gist.github.com/hiroppy/1c89d73a12073bad0c187aaab4ca92c2

import { Request, Response } from 'express';
import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
//@ts-ignore
import { getLoadableState } from 'loadable-components/server';

// graphql
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { createClient } from '../../../graphql/client';

import { renderFullPage } from '../../renderFullPage';
import { Router } from '../../../client/Router';
import { configureStore, runSaga } from '../../../client/store/configureStore';

const fileName = 'main';
const main = new RegExp(`^${fileName}~.*\.js$`);
const vendor = new RegExp(`^vendor~${fileName}~.*\.js$`);

// You need to reboot this server if you change client javascript files.
// You need to read the manifest in `get` method if you do not want to restart.
const assets = (process.env.NODE_ENV === 'production'
  ? (() => {
      const manifest: {
        [key: string]: string;
      } = require('../../../../dist/manifest');

      const entryPoints = [manifest['manifest.js']];

      for (const [key, value] of Object.entries(manifest)) {
        if (main.test(key) || vendor.test(key)) entryPoints.push(value);
      }

      return entryPoints;
    })()
  : [`/public/${fileName}.bundle.js`]
)
  .map((f) => `<script src="${f}"></script>`)
  .join('\n');

export async function get(req: Request, res: Response) {
  const store = configureStore();
  const client = createClient();
  const sheet = new ServerStyleSheet();

  const App = (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          {/* add `div` because of `hydrate` */}
          <div id="root">
            <Router />
          </div>
        </StaticRouter>
      </Provider>
    </ApolloProvider>
  );

  try {
    const [loadableState] = await Promise.all([
      getLoadableState(App), // kick redux-saga and styled-components
      runSaga(),
      getDataFromTree(App)
    ]);

    const preloadedState = JSON.stringify(store.getState());
    const helmetContent = Helmet.renderStatic();
    const meta = `
      ${helmetContent.meta.toString()}
      ${helmetContent.title.toString()}
      ${helmetContent.link.toString()}
    `.trim();
    const style = sheet.getStyleTags();
    const body = renderToString(App);
    const scripts = loadableState.getScriptTag();
    const graphql = JSON.stringify(client.extract());

    res.send(renderFullPage({ meta, assets, body, style, preloadedState, scripts, graphql }));
  } catch (e) {
    res.status(500).send(e.message);
  }
}
