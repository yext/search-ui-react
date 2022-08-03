module.exports = {
  ...require('./jest.base.config'),
  collectCoverageFrom: [
    'src/components/**'
  ],
  coverageDirectory: '<rootDir>/coverage/visual-regression',
  testMatch: [
    '<rootDir>/tests/storyshot.test.ts'
  ]
};