import * as React from 'react';
import styled from 'styled-components';
import { Header } from '../../../containers/Header';

interface Props {
  children: React.ReactNode;
}

const Container = styled.div`
  margin: 15px 30px;
`;

export const Main = ({ children }: Props) => (
  <React.Fragment>
    <Header />
    <Container>{children}</Container>
  </React.Fragment>
);
