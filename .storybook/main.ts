// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-webpack5';
import React from 'react';
import path from 'path';

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
    // NOTE: not using @storybook/addon-coverage preset (it triggers import.meta.resolve)
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  staticDirs: ['./public'],

  webpackFinal: async (config) => {
    const final = {
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
                  // ALWAYS include babel-plugin-istanbul so coverage is available by default.
                  // This avoids requiring a runtime flag or env var.
                  plugins: [
                    require.resolve('babel-plugin-istanbul'),
                  ],
                },
              },
            ],
          },
          // no istanbul-instrumenter-loader here (incompatible with webpack5)
        ],
      },
    };

    return final;
  },

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
