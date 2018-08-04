import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface Props {
  userName: string;
  orgName: string;
}

const L = styled(Link)`
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

export const Header = ({ userName, orgName }: Props) => (
  <HeaderComponent>
    <L to="/">{'<'}</L>
    <span>{orgName}</span>
    <span>{userName}</span>
  </HeaderComponent>
);
