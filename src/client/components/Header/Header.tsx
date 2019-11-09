import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getEnv } from '../../selectors';

const A = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const HeaderComponent = styled.header`
  align-items: center;
  background: #333;
  color: #f5f5f5;
  font-size: 1.3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  justify-content: space-between;
  padding: 15px 30px;
  & > * {
    text-align: center;
  }
`;

export const Header: React.FC = () => {
  const env = useSelector(getEnv);

  return (
    <HeaderComponent>
      <A to="/">{'<'}</A>
      <A to="/saga">saga</A>
      <A to="/apollo">apollo</A>
      <span>{env}</span>
    </HeaderComponent>
  );
};
