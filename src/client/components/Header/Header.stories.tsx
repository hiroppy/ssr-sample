import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '.';

const stories = storiesOf('components/Header', module);

stories.add('default', () => (
  <MemoryRouter initialEntries={['/']}>
    <Header userName="user" orgName="org" />
  </MemoryRouter>
));
