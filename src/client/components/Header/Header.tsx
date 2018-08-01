import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface Props {
  userName: string;
  orgName: string;
}

const HeaderComponent = styled.header`
  align-items: center;
  background: #333;
  color: #f5f5f5;
  display: flex;
  font-size: 1.3rem;
  justify-content: space-between;
  padding: 15px 30px;
`;

export const Header = ({ userName, orgName }: Props) => (
  <HeaderComponent>
    <Link to="/">🏠</Link>
    <span>{orgName}</span>
    <span>{userName}</span>
  </HeaderComponent>
);
