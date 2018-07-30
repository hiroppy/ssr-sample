import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface Props {
  name: string;
}

const HeaderComponent = styled.header`
  background: #333;
  color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
`;

const Input = styled.input`
  border: none;
  border-radius: 3px;
  font-size: 0.8rem;
  outline: none;
  padding: 2px 10px;
`;

export const Header = ({ name }: Props) => (
  <HeaderComponent>
    <Link to="/">🏠</Link>
    <span>{name}</span>
    <Input type="input" placeholder="search repository" />
  </HeaderComponent>
);
