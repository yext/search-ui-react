const tailwindConfig = require('../test-site/tailwind.config');

module.exports = {
  ...tailwindConfig,
  content: [
    './src/**/*.{ts,tsx}'
  ]
};