import { Page } from 'playwright-core';
import { TestRunnerConfig, TestContext } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const customSnapshotsDir = `${process.cwd()}/.storybook/snapshots/__snapshots__`;

/**
 * See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
const renderFunctions: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page: Page, context: TestContext) {
    if (context.id.startsWith("mapboxmap--")) {
      await page.waitForTimeout(5000);
    }

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
      failureThreshold: context.id === "geolocation--loading" ? 0.005 : 0,
      failureThresholdType: "percent"
    });
  },
};

export default renderFunctions;
