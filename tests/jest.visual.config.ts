import config from "./jest.base.config";

module.exports = {
  ...config,
  collectCoverageFrom: [
    'src/components/**'
  ],
  coverageDirectory: 'coverage/visual-regression',
  testMatch: [
    '<rootDir>/storyshot.test.ts'
  ]
};