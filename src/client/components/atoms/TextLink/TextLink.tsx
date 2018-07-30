import * as React from 'react';
import styled from 'styled-components';

export interface Props {
  link: string;
  children: React.ReactNode;
}

const A = styled.a`
  text-decoration: none;
  font-size: 1.7rem;
`;

export const TextLink = ({ link, children }: Props) => (
  <A href={link} target="_blank" rel="noopener noreferrer">
    {children}
  </A>
);
