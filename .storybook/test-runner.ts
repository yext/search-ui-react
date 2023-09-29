import { injectAxe, checkA11y } from 'axe-playwright';
import { Page } from 'playwright-core';
import { runOnly } from './wcagConfig';
import { TestContext, TestRunnerConfig } from '@storybook/test-runner';

/**
 * See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
const renderFunctions: TestRunnerConfig = {
  async preRender(page: Page) {
    await injectAxe(page);
  },
  async postRender(page: Page, context: TestContext) {
    await checkA11y(
      page,
      {
        exclude: ['#root .mapboxgl-canvas-container'],
      },
      {
        axeOptions: {
          runOnly,
          rules: {
            'color-contrast': { enabled: context.name !== 'Loading' },
          },
        },
        detailedReport: true,
        detailedReportOptions: {
          html: true,
        },
      }
    );
  },
};

export default renderFunctions;