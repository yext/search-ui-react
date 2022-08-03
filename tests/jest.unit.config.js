import { base_config } from './jest.base.config.js'

const config = {
  ...base_config,
  collectCoverageFrom: [
    'src/**'
  ],
  coverageDirectory: '<rootDir>/coverage/unit',
  testMatch: [
    '<rootDir>/tests/**/*.test.ts?(x)'
  ]
};

export default config