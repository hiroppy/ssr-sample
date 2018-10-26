import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import viewport from '@storybook/addon-viewport';

const req = require.context('../src/client', true, /.stories.tsx$/);

addDecorator([viewport]);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
