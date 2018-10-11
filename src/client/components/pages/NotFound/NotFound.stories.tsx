import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFound } from '.';

const stories = storiesOf('components/pages/NotFound', module);

stories.add('default', () => (
  <div
    style={{
      width: '80%',
      margin: '50px auto',
      background: '#f5f5f5'
    }}
  >
    <MemoryRouter initialEntries={['/']}>
      <NotFound />
    </MemoryRouter>
  </div>
));
