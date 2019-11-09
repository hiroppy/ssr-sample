import React from 'react';
import { CodeSamplesBox } from '.';

export default {
  component: CodeSamplesBox,
  title: 'CodeSamplesBox'
};

export const Base = () => (
  <CodeSamplesBox
    samples={[
      {
        id: 1,
        name: 'Foo',
        code: 'code\ncode\n',
        likeCount: 0,
        description: 'this is foo'
      },
      {
        id: 2,
        name: 'Bar',
        code: 'code\ncode\n',
        likeCount: 0,
        description: 'this is bar'
      }
    ]}
    addLike={() => {}}
  />
);
