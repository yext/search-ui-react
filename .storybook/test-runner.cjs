const { injectAxe, checkA11y } = require('axe-playwright');

const config = {
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
  }
};

/*
* See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
* to learn more about the test-runner hooks API.
*/
module.exports = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    const axeOptions = context.name === 'Loading'
      ? {
        ...config,
        rules: {
          'color-contrast': { enabled: false }
        }
      }
      : config;
    await checkA11y(page, '#root', {
      axeOptions,
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};