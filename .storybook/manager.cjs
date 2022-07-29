const { addons } = require('@storybook/addons');

addons.setConfig({
  theme: require('./yextTheme.cjs')
});

window.STORYBOOK_GA_ID = 'GTM-T2C2W9D';
window.STORYBOOK_REACT_GA_OPTIONS = {};