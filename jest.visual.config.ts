import { base_config } from "./jest.base.config";

module.exports = {
  ...base_config,
  collectCoverageFrom: [
    'src/components/**'
  ],
  coverageDirectory: 'coverage/visual-regression',
  testMatch: [
    '<rootDir>/tests/storyshot.test.ts'
  ]
};