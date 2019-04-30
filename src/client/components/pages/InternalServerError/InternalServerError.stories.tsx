import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { InternalServerError } from '.';

const stories = storiesOf('components/pages/InternalServerError', module);

stories.add('default', () => (
  <div
    style={{
      width: '80%',
      margin: '50px auto',
      background: '#f5f5f5'
    }}
  >
    <MemoryRouter initialEntries={['/']} keyLength={0}>
      <InternalServerError />
    </MemoryRouter>
  </div>
));
