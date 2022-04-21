module.exports = {
  extends: [
    '@yext/slapshot/typescript-react'
  ],
  ignorePatterns: ['lib', 'tests/setup/responses', 'storybook-static', '!.storybook'],
  overrides: [
    {
      files: ['src/components/cards/standard/StandardCard.tsx'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off'
      }
    },
    {
      files: ['**/*.{test,stories}.*'],
      rules: {
        'react-perf/jsx-no-new-array-as-prop': 'off',
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'react-perf/jsx-no-new-object-as-prop': 'off'
      }
    }
  ]
};
