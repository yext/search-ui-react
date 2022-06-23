const tailwindConfig = require('../tailwind.config.cjs');
const { ComponentsContentPath } = require('@yext/answers-react-components');

module.exports = {
  ...tailwindConfig,
  content: [
    './src/**/*.{ts,tsx}',
    ComponentsContentPath
  ]
}
