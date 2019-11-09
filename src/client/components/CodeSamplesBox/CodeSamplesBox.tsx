import React, { useState } from 'react';
import styled from 'styled-components';
import { Samples } from '../../../server/responseSchema';

export type Props = {
  samples: Samples;
  addLike: (id: number) => void;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  grid-template-rows: auto;
  grid-gap: 12px;
`;

const CodeBoxContainer = styled.div<{ isOpen: boolean }>`
  word-break: break-all;
  border: 2px solid #333;
  padding: 0 12px;

  & > h2 {
    letter-spacing: 1px;
  }

  & > pre {
    background: #333;
    color: #f5f5f5;
    height: 240px;
    height: ${({ isOpen }) => (isOpen ? '100%' : 'hidden')}
    padding: 12px;
    font-size: 1.2rem;
    overflow: auto;
  }
`;

const LikeButton = styled.a`
  border-bottom: 2px solid #ccc;
  cursor: pointer;
  margin-left: 4px;
  padding: 0 2px;
  user-select: none;
`;

const CollapseButton = styled.a``;

const CodeBox: React.FC<Omit<Props['samples'][0], 'code'> & Pick<Props, 'addLike'>> = ({
  children,
  id,
  name,
  likeCount,
  description,
  addLike
}) => {
  const [isOpen, changeState] = useState(false);
  const onClick = () => {
    changeState(!isOpen);
  };

  return (
    <CodeBoxContainer isOpen={isOpen}>
      <h2>{name}</h2>
      {likeCount}
      <LikeButton onClick={() => addLike(id)} data-testid="like-button">
        likes
      </LikeButton>
      <p>{description}</p>
      <CollapseButton onClick={onClick} data-testid="collapse-button">
        {isOpen ? 'close' : 'open'}
      </CollapseButton>
      <pre>{children}</pre>
    </CodeBoxContainer>
  );
};

export const CodeSamplesBox: React.FC<Props> = ({ samples, addLike }) => {
  return (
    <Container>
      {samples.map(({ code, id, ...rest }) => (
        <CodeBox key={id} id={id} {...rest} addLike={addLike}>
          {code}
        </CodeBox>
      ))}
    </Container>
  );
};
