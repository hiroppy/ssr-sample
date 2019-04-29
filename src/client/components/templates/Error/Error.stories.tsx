import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Error } from '.';

const stories = storiesOf('components/templates/Error', module);

stories.add('default', () => (
  <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
    <Error>foo</Error>
  </MemoryRouter>
));
