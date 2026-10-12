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
  async preVisit(page: Page, context: TestContext) {
    // Mapbox honors reduced motion by skipping camera animations. This prevents pin
    // clicks from interrupting fitBounds at different zoom levels across snapshot runs,
    // while preserving normal animations when browsing Storybook interactively.
    await page.emulateMedia({
      reducedMotion: context.id.startsWith('mapboxmap--') ? 'reduce' : 'no-preference',
    });
  },
  async postVisit(page: Page, context: TestContext) {
    if (context.id === 'locationbias--loading') {
      return;
    }

    const isMapboxMapStory = context.id.startsWith('mapboxmap--');
    if (isMapboxMapStory) {
      await page.waitForTimeout(7500);
    }

    const image = await page.screenshot();
    const useFailureThreshold = context.id === 'geolocation--loading' || context.id === 'staticfilters--searchable' || isMapboxMapStory;
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
      failureThreshold: useFailureThreshold
        ? 0.005
        : 0,
      failureThresholdType: 'percent'
    });
  },
};

export default renderFunctions;
