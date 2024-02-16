import type { StorybookConfig } from '@storybook/react-webpack5';
import React from 'react';

const config: StorybookConfig = {
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
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  staticDirs: ['./public'],

  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        './SearchCore': require.resolve('../tests/__fixtures__/core/SearchCore.ts'),
        '../utils/location-operations': require.resolve('../tests/__fixtures__/utils/location-operations.ts')
      },
    },
    ...(!React.version.startsWith('18') && { externals: ["react-dom/client"] })
  }),

  env: (config) => {
    const mapboxApiKey = process.env.MAPBOX_API_KEY || process.env.REACT_APP_MAPBOX_API_KEY;
    return {
      ...config,
      ...(mapboxApiKey && { REACT_APP_MAPBOX_API_KEY: mapboxApiKey })
    };
  },

  docs: {
    autodocs: true
  }
};

export default config;
