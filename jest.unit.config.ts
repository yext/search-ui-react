import { base_config } from './jest.base.config';
module.exports = {
  ...base_config,
  collectCoverageFrom: [
    'src/**'
  ],
  testMatch: [
    '<rootDir>/tests/**/*.test.ts?(x)'
  ]
};