process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';
require('react-scripts/config/env');

module.exports = {
  "setupFilesAfterEnv": [
    "<rootDir>/tests/__setup__/setup-env.ts"
    ]
  };