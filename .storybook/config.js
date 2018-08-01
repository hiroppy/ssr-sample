import * as React from 'react';
import { configure } from '@storybook/react';

const req = require.context('../src/client', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
