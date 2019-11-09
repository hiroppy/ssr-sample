import React from 'react';
import { useDispatch } from 'react-redux';
import Md from 'react-markdown';
import styled from 'styled-components';
import raw from 'raw.macro';
import { loadTopPage } from '../../../actions/pages';
import { Head } from '../../Head';

const md = process.env.NODE_ENV !== 'test' ? raw('../../../../../README.md') : 'test-code';

const Container = styled.div`
  margin: auto;
  width: 80%;

  & pre {
    background: #333;
    color: #f5f5f5;
    padding: 4px 12px;
    overflow: auto;
  }
`;

export const Top: React.FC = () => {
  const dispatch = useDispatch();

  dispatch(loadTopPage());

  return (
    <>
      <Head title="top-page" />
      <section>
        <Container>
          <Md source={md} />
        </Container>
      </section>
    </>
  );
};
