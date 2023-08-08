module.exports = {
  extends: ['@yext/slapshot/typescript-react', 'plugin:storybook/recommended'],
  ignorePatterns: ['lib', 'tests/setup/responses', 'storybook-static', '!.storybook'],
  overrides: [{
    files: ['**/*.{test,stories}.*'],
    rules: {
      'react-perf/jsx-no-new-array-as-prop': 'off',
      'react-perf/jsx-no-new-function-as-prop': 'off',
      'react-perf/jsx-no-new-object-as-prop': 'off'
    }
  }]
};