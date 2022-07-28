module.exports = {
  stories: [
    '../tests/**/*.stories.ts?(x)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-storyshots',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  features: {
    storyStoreV7: !global.navigator?.userAgent?.match?.('jsdom'),
  },
  framework: '@storybook/react',
  staticDirs: ['./public'],
  webpackFinal: async (config) => {
    config.resolve.alias['./SearchCore'] = require.resolve('../tests/__fixtures__/core/SearchCore.ts');
    config.resolve.alias['../utils/location-operations'] = require.resolve('../tests/__fixtures__/utils/location-operations.ts');
    return config;
  }
};