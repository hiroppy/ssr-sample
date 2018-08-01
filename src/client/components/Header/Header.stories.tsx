import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '.';

const stories = storiesOf('components/organisms/Header', module);

stories.add('default', () => (
  <MemoryRouter initialEntries={['/']}>
    <Header name="header" />
  </MemoryRouter>
));
