import initStoryshots from "@storybook/addon-storyshots";
import { render } from "@testing-library/react";
import { resolve } from "path";

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 1)
  };
});

initStoryshots({
  configPath: resolve(__dirname, "../../.storybook"),
  framework: 'react',
  renderer: render
});