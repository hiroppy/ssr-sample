import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Header } from '../Header';
import { loadAppProcess } from '../../actions/pages';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Muli', sans-serif;
    font-size:62.5%;
    margin: 0;
  }
`;

const Container = styled.div`
  margin: 15px 30px;
  font-size: 1rem;
`;

// like App-Shell of PWA
export const App: React.FC = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  if (!process.env.IS_BROWSER) {
    dispatch(loadAppProcess());
  } else {
    useEffect(() => {
      dispatch(loadAppProcess());
    }, []);
  }

  // change location
  // e.g. send to Google Analytics...
  useEffect(() => {}, [location]);

  return (
    <>
      <Header />
      <GlobalStyle />
      <Container>{children}</Container>
    </>
  );
};
