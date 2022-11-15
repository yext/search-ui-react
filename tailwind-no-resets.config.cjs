const tailwindConfig = require('./tailwind.config.cjs');

module.exports = {
  ...tailwindConfig,
  corePlugins: {
    preflight: false
  }
};
