const tailwindConfig = require('../tailwind.config.cjs');
const { ComponentsContentPath } = require('@yext/search-ui-react');

module.exports = {
  ...tailwindConfig,
  content: [
    './src/**/*.{ts,tsx}',
    ComponentsContentPath
  ],
  theme: {
    ...tailwindConfig.theme,
    extend: {
      ...tailwindConfig.theme.extend,
      borderColor: {
        DEFAULT: 'black'
      }
    }
  }
}
