const tailwindConfig = require('../tailwind.config.cjs');

module.exports = {
  ...tailwindConfig,
  content: [
    './src/**/*.{ts,tsx}'
  ],
  safelist: [
    {
      pattern: /^(.*?)/,
    },
  ],
};