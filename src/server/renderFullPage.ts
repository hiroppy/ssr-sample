import { Response } from 'express';

type Params = {
  meta: string;
  body?: string;
  style?: string;
  preloadedState: string;
  graphql: string;
  nonce: string;
  scripts: string;
  res: Response;
};

const escape = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const renderFullPage = ({
  meta,
  body,
  style,
  scripts,
  preloadedState,
  graphql,
  nonce,
  res
}: Params) => {
  // TODO
  res.write(
    `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="Description" content="introducing SPA and SSR">
          <meta property="csp-nonce" content="${nonce}">
          ${meta}
          <link rel="manifest" href="/manifest.webmanifest">
          <link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet"></link>
          ${style}
        </head>
        <body>
          ${body}
          <script nonce="${nonce}" id="initial-data" type="text/plain" data-json="${escape(
      preloadedState
    )}"></script>
          <script nonce="${nonce}">window.__APOLLO_STATE__=${graphql}</script>
          ${scripts}
    `.trim()
  );
};
