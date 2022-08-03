
module.exports = {
  ...require('./jest.base.config'),
  collectCoverageFrom: [
    'src/**'
  ],
  coverageDirectory: '<rootDir>/coverage/unit',
  testMatch: [
    '<rootDir>/tests/**/*.test.ts?(x)'
  ]
};
