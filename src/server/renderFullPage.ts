interface Params {
  meta: string;
  assets: Array<string>;
  body: string;
  style: string;
  preloadedState: string;
  scripts: string;
  graphql: string;
  nonce: string;
}

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
  assets,
  body,
  style,
  preloadedState,
  scripts,
  graphql,
  nonce
}: Params) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta property="csp-nonce" content="${nonce}">
        ${meta}
        ${style}
      </head>
      <body>
        ${body}
        <script nonce="${nonce}" id="initial-data" type="text/plain" data-json="${escape(
    preloadedState
  )}"></script>
        <script nonce="${nonce}">window.__APOLLO_STATE__=${graphql}</script>
        ${scripts}
        ${assets.map((asset) => `<script nonce="${nonce}" src=${asset}></script>`).join('\n')}
      </body>
    </html>
  `.trim();
};
