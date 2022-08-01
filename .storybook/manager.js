const { addons } = require('@storybook/addons');

addons.setConfig({
  theme: require('./yextTheme.cjs')
});

window.slapshottestmanager = 'hello manager.js';
console.log('manager!!!!');
