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
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-trailing-spaces' : ['error'],
    'no-multi-spaces' : ['error'],
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', {
      named: 'never',
      anonymous: 'never'
    }],
    'keyword-spacing': ['error'],
    'quote-props': ['error', 'as-needed'],
    'max-len': ['error', {
      code: 110,
      ignorePattern: '(^import\\s.+\\sfrom\\s.+;$|<path.+>$)',
      ignoreStrings: true
    }],
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'import/no-default-export': ['error']
  },
  ignorePatterns: ['lib', 'tests/setup/responses']
};
