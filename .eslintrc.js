module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-trailing-spaces' : ['error'],
    'no-multi-spaces' : ['error'],
    quotes: ['error', 'single'],
    'space-before-function-paren': ['error', {
      named: 'never',
      anonymous: 'never'
    }],
    'quote-props': ['error', 'as-needed'],
    'max-len': ['error', {
      code: 110,
      ignorePatterns: ['^import\\s.+\\sfrom\\s.+;$', '<path.+<\/path>$']
    }],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/no-var-requires': 0,
  },
  ignorePatterns: ['lib', 'tests/setup/responses']
};
