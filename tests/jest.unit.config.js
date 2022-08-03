
module.exports = {
  ...require('./jest.base.config'),
  collectCoverageFrom: [
    'src/**'
  ],
  coverageDirectory: '<rootDir>/coverage',
  testMatch: [
    '<rootDir>/tests/**/*.test.ts?(x)'
  ]
};
