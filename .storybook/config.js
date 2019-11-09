import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addDecorator } from '@storybook/react';
import { GlobalStyle } from '../src/client/components/App';

configure(requireContext('../src/client/components', true, /\.stories\.tsx?$/), module);

addDecorator((tree) => (
  <>
    <GlobalStyle />
    <div style={{ margin: '12px', fontSize: '1rem' }}>{tree()}</div>
  </>
));
