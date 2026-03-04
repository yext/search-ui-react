import { injectAxe, checkA11y } from 'axe-playwright';
import { Page } from 'playwright-core';
import { runOnly } from '../wcagConfig';
import { TestContext, TestRunnerConfig } from '@storybook/test-runner';

const AXE_ALREADY_RUNNING_ERROR = 'Axe is already running';
const MAX_AXE_RETRIES = 3;
const AXE_RETRY_DELAY_MS = 250;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry if errors from Axe already running to decrease flakiness
const runA11yCheck = async (page: Page, context: TestContext) => {
  for (let attempt = 1; attempt <= MAX_AXE_RETRIES; attempt++) {
    try {
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
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes(AXE_ALREADY_RUNNING_ERROR) || attempt === MAX_AXE_RETRIES) {
        throw error;
      }
      await sleep(AXE_RETRY_DELAY_MS * attempt);
    }
  }
};

/**
 * See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
const renderFunctions: TestRunnerConfig = {
  async preVisit(page: Page) {
    await injectAxe(page);
  },
  async postVisit(page: Page, context: TestContext) {
    await runA11yCheck(page, context);
  },
};

export default renderFunctions;
