interface Params {
  meta: string;
  body: string;
  style: string;
  preloadedState: string;
}

const escape = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

export const renderFullPage = ({ meta, body, style, preloadedState }: Params) => {
  return `
    <html>
      <head>
        ${meta}
        ${style}
      </head>
      <body>
        ${body}
        <script id="initial-data" type="text/plain" data-json="${escape(preloadedState)}"></script>
        <script src="${process.env.CLIENT_JS_URL}"></script>
      </body>
    </html>
  `.trim();
};
