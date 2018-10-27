import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 15px 30px;

  & > *:not(:first-child) {
    margin-top: 24px;
  }
`;

export const Error: React.SFC = ({ children }) => (
  <React.Fragment>
    <Container>
      <p>{children}</p>
      <Link to="/">Go Back to Top Page</Link>
    </Container>
  </React.Fragment>
);
