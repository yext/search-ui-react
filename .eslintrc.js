module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'eslint-plugin-import'
  ],
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    'no-trailing-spaces' : ['warn'],
    'no-multi-spaces' : ['warn'],
    quotes: ['warn', 'single'],
    'object-curly-spacing': ['warn', 'always'],
    'space-before-function-paren': ['warn', {
      named: 'never',
      anonymous: 'never'
    }],
    'keyword-spacing': ['warn'],
    'quote-props': ['warn', 'as-needed'],
    'max-len': ['warn', {
      code: 110,
      ignorePattern: '(^import\\s.+\\sfrom\\s.+;$|<path.+>$)',
      ignoreStrings: true
    }],
    '@typescript-eslint/semi': ['warn'],
    '@typescript-eslint/type-annotation-spacing': ['warn'],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'import/no-default-export': ['warn']
  },
  ignorePatterns: ['lib', 'tests/setup/responses', 'storybook-static', '!.storybook']
};
