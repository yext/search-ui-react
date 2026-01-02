import { injectAxe, checkA11y } from 'axe-playwright';
import { Page } from 'playwright-core';
import { runOnly } from '../wcagConfig';
import { TestContext, TestRunnerConfig } from '@storybook/test-runner';

/**
 * See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
// Mutex to serialize axe checks and avoid concurrency issues
let axeLock: Promise<void> = Promise.resolve();

const renderFunctions: TestRunnerConfig = {
  async preVisit(page: Page) {
    await injectAxe(page);
  },
  async postVisit(page: Page, context: TestContext) {
    // Serialize axe checks to avoid "Axe is already running" error
    axeLock = axeLock.then(async () => {
      await checkA11y(
        page,
        {
          exclude: [
            '#root .mapboxgl-canvas-container',
            '.mapboxgl-marker',
            '.mapboxgl-popup-close-button'
          ],
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
    });
    await axeLock;
  },
};

export default renderFunctions;
