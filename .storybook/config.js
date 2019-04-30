const { configure } = require('@storybook/react');
const requireContext = require('require-context.macro');

const req = requireContext('../src/client', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
