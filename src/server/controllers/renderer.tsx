// renderToNodeStream
// https://gist.github.com/hiroppy/1c89d73a12073bad0c187aaab4ca92c2

import { Request, Response } from 'express';
import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { renderFullPage } from '../HTML';
import { Router } from '../../client/Router';
import { configureStore } from '../../client/store/configureStore';
import { rootSaga } from '../../client/sagas';

export function get(req: Request, res: Response) {
  const store = configureStore();
  const sheet = new ServerStyleSheet();

  const jsx = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {/* add `div` because of `hydrate` */}
        <div id="root">
          <Router />
        </div>
      </StaticRouter>
    </Provider>
  );

  store
    .runSaga(rootSaga)
    .done.then(() => {
      const preloadedState = JSON.stringify(store.getState());
      const style = sheet.getStyleTags();
      const body = renderToString(jsx);

      // react-helmet
      const helmetContent = Helmet.renderStatic();
      const meta = `
        ${helmetContent.title.toString()}
        ${helmetContent.meta.toString()}
      `.trim();

      res.send(renderFullPage({ meta, body, style, preloadedState }));
    })
    .catch((e: Error) => {
      res.status(500).send(e.message);
    });

  // kick redux-saga
  renderToStaticMarkup(sheet.collectStyles(jsx));

  // close redux-saga(because using `fork`)
  store.close();
}
