import * as React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  children: React.ReactNode;
  initialData: string;
}

// TODO: helmet
export const HTML = ({ children, initialData }: Props) => (
  <html>
    <head>
      <title>Hello World</title>
      <link rel="canonical" href="https://www.tacobell.com/" />
    </head>
    <body>
      <div id="root">{children}</div>
      <script id="initial-data" type="text/plain" data-json={initialData} />
      <script src={`${process.env.CLIENT_JS_URL}`} />
    </body>
  </html>
);
