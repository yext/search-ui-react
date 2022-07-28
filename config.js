import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';

const configure = require('@storybook/react').configure;
const req = requireContext('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);