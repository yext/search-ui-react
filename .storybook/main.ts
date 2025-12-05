import type { StorybookConfig } from '@storybook/react-webpack5';
import React from 'react';

const reactMajorVersion = Number(React.version.split('.')[0]);
const isLegacyReact = Number.isNaN(reactMajorVersion) ? false : reactMajorVersion < 18;

const config: StorybookConfig = {
  stories: [
    '../tests/**/*.stories.tsx'
  ],
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
      extensions: [
        ...(config.resolve?.extensions ?? []),
        '.ts',
        '.tsx',
      ],
      alias: {
        ...config.resolve?.alias,
        './SearchCore': require.resolve('../tests/__fixtures__/core/SearchCore.ts'),
        '../utils/location-operations': require.resolve('../tests/__fixtures__/utils/location-operations.ts')
      },
    },
    ...(isLegacyReact && { externals: ['react-dom/client'] }),
    module: {
      ...config.module,
      rules: [
        ...(config.module?.rules ?? []),
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
                presets: [
                  require.resolve('@babel/preset-env'),
                  require.resolve('@babel/preset-react'),
                  require.resolve('@babel/preset-typescript'),
                ],
              },
            },
          ],
        },
      ],
    },
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
