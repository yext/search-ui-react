import config from './jest.base.config'
module.exports = {
  ...config,
  collectCoverageFrom: [
    'src/**'
  ],
  testMatch: [
    '<rootDir>/**/*.test.ts?(x)'
  ]
};