const configure = require('@storybook/react').configure;
const req = require.context('../storybook', true, /story\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);