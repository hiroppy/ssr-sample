import * as React from 'react';
import Helmet from 'react-helmet';

export interface Props {
  title: string;
}

export const Head: React.SFC<Props> = ({ title }) => (
  <Helmet>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet" />
  </Helmet>
);
