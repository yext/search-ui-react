const { addons } = require('@storybook/addons');

addons.setConfig({
  theme: require('./yextTheme.cjs')
});

// ADD STORYBOOK ID
// window.STORYBOOK_GA_ID = "UA-000000-01"
// window.STORYBOOK_REACT_GA_OPTIONS = {}