import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loadTopPage } from '../../../actions/pages';
import { Head } from '../../Head';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  font-size: 2rem;
`;

export const NotFound: React.FC = () => {
  const dispatch = useDispatch();

  // TODO: fix
  dispatch(loadTopPage());

  return (
    <>
      <Head title="404-page" />
      <Container>[404] Not Found</Container>
    </>
  );
};
