const tailwindConfig = require('../tailwind.config.cjs');
const { AnswersTailwindPath } = require('@yext/answers-react-components')

module.exports = {
  ...tailwindConfig,
  content: [
    './src/**/*.{ts,tsx}',
    AnswersTailwindPath
  ]
}
