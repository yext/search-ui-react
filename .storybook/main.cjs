module.exports = {
  stories: [
    '../tests/**/*.stories.tsx'
  ],
  features: {
    storyStoreV7: false,
  },
  addons: [
    '@etchteam/storybook-addon-status',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          include: ['src/components/**']
        }
      }
    },
    '@storybook/addon-styling-webpack'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  staticDirs: ['./public'],

  webpackFinal: async (config) => {
    //use commonjs entry point for "@reach" packages
    config.resolve.alias['@reach/auto-id'] = require.resolve('@reach/auto-id');
    config.resolve.alias['@reach/utils'] = require.resolve('@reach/utils');

    config.resolve.alias['./SearchCore'] = require.resolve('../tests/__fixtures__/core/SearchCore.ts');
    config.resolve.alias['../utils/location-operations'] = require.resolve('../tests/__fixtures__/utils/location-operations.ts');
    return config;
  },

  env: (config) => ({
    ...config,
    REACT_APP_MAPBOX_API_KEY: process.env.MAPBOX_API_KEY || process.env.REACT_APP_MAPBOX_API_KEY,
  }),

  docs: {
    autodocs: true
  }
};