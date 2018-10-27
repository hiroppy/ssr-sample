import * as React from 'react';
import styled from 'styled-components';
import { Header } from '../../../containers/Header';

const Container = styled.div`
  margin: 15px 30px;
`;

export const Main: React.SFC = ({ children }) => (
  <React.Fragment>
    <Header />
    <Container>{children}</Container>
  </React.Fragment>
);
