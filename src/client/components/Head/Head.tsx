import * as React from 'react';
import Helmet from 'react-helmet';

export type Props = {
  title: string;
  color?: string;
};

export const Head: React.FC<Props> = ({ title, color = '#3498db' }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="theme-color" content={color} />
  </Helmet>
);
