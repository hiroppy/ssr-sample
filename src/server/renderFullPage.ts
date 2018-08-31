interface Params {
  meta: string;
  assets: string;
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

export const renderFullPage = ({ meta, assets, body, style, preloadedState }: Params) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        ${meta}
        ${style}
      </head>
      <body>
        ${body}
        <script id="initial-data" type="text/plain" data-json="${escape(preloadedState)}"></script>
        ${assets}
      </body>
    </html>
  `.trim();
};
