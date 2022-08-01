const { addons } = require('@storybook/addons');

addons.setConfig({
  theme: require('./yextTheme.cjs')
});

window.STORYBOOK_GA_ID = '';
window.STORYBOOK_REACT_GA_OPTIONS = {};