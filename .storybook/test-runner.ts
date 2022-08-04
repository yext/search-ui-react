import { injectAxe, checkA11y } from 'axe-playwright';
import { Page } from 'playwright-core';

/**
 * See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
const renderFunctions = {
  async preRender(page: Page) {
    await injectAxe(page);
  },
  async postRender(page: Page, context) {
    await checkA11y(page, '#root', {
      axeOptions: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
        },
        rules: {
          'color-contrast': { enabled: context.name !== 'Loading' }
        },
      },
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default renderFunctions;