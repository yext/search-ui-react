window.STORYBOOK_GA_ID = 'UA-236173376-1';
window.STORYBOOK_REACT_GA_OPTIONS = {};

const { addons } = require('@storybook/addons');

addons.setConfig({
  theme: require('./yextTheme.cjs')
});
