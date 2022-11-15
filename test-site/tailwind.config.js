const tailwindConfig = require('../.storybook/tailwind.config.cjs');
const { ComponentsContentPath } = require('@yext/search-ui-react');

module.exports = {
  ...tailwindConfig,
  content: [
    './src/**/*.{ts,tsx}',
    ComponentsContentPath
  ]
};
