import baseConfig from '../main';
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  ...baseConfig,
  stories: baseConfig.stories.map((glob) => `../${glob}`),
};

export default config;
