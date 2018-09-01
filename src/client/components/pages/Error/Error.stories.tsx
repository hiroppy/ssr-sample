import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Error } from '.';

const stories = storiesOf('components/pages/Error', module);

stories.add('default', () => (
  <div
    style={{
      width: '80%',
      margin: '50px auto',
      background: '#fff'
    }}
  >
    <MemoryRouter initialEntries={['/404']}>
      <Error load={() => {}} status={404} />
    </MemoryRouter>
  </div>
));
