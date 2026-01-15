import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const config = [
  ...compat.extends('@yext/slapshot/typescript-react'),
  {
    ignores: ['lib', 'tests/setup/responses', 'storybook-static', '!.storybook', '**/test-site/**']
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['**/*.{test,stories}.*'],
    rules: {
      'react-perf/jsx-no-new-array-as-prop': 'off',
      'react-perf/jsx-no-new-function-as-prop': 'off',
      'react-perf/jsx-no-new-object-as-prop': 'off',
      'no-multiple-empty-lines': 'off'
    }
  }
];

export default config;
