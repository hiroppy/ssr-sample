import { Request, Response } from 'express';
import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToNodeStream, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { HTML } from '../HTML';
import { Router } from '../../client/Router';
import { configureStore } from '../../client/store/configureStore';
import { rootSaga } from '../../client/sagas';

export function get(req: Request, res: Response) {
  const store = configureStore();
  const context = {};

  const comp = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Router />
      </StaticRouter>
    </Provider>
  );

  store
    .runSaga(rootSaga)
    .done.then(() => {
      const preloadedState = store.getState();
      const sheet = new ServerStyleSheet();
      const jsx = <HTML initialData={JSON.stringify(preloadedState)}>{comp}</HTML>;

      const jsxWithStyles = sheet.collectStyles(jsx);
      const stream = sheet.interleaveWithNodeStream(renderToNodeStream(jsxWithStyles));

      stream.pipe(
        res,
        { end: false }
      );
      stream.on('end', () => res.send());
    })
    .catch((e: Error) => {
      res.status(500).send(e.message);
    });

  // kick redux-saga
  renderToStaticMarkup(comp);

  // close redux-saga(because using `fork`)
  store.close();
}
