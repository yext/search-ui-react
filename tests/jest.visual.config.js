import { base_config } from './jest.base.config.js'

const config = {
  ...base_config,
  collectCoverageFrom: [
    'src/components/**'
  ],
  coverageDirectory: 'coverage/visual-regression',
  testMatch: [
    '<rootDir>/tests/storyshot.test.ts'
  ]
};

export default config