const tailwindConfig = require('../tailwind.config.cjs');

module.exports = {
  ...tailwindConfig,
  content: [
    './src/**/*.{ts,tsx}'
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
};