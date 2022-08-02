import type { Config } from '@jest/types';

const config: Config.InitialOptions =  {
    bail: 0,
    verbose: true,
    collectCoverage: false,
    moduleFileExtensions: [
      'js',
      'json',
      'ts',
      'tsx'
    ],
    globals: {
      "ts-jest": {
        tsConfig: "<rootDir>/../tsconfig.cjs.json" // Directly target the tsconfig shared across projects
      }
    },
    moduleDirectories: [
      'node_modules',
      '<rootDir>'
    ],
    resolver: '<rootDir>/__setup__/resolver.ts',
    setupFilesAfterEnv: [
      '<rootDir>/__setup__/setup-env.ts'
    ],
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: [
      '<rootDir>/__setup__/*',
      '<rootDir>/__fixtures__/*'
    ],
    transform: {
      '^.+\\.(ts|tsx)?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@yext/search-headless-react)/)'
    ],
    moduleNameMapper: {
      './SearchCore': '<rootDir>/__fixtures__/core/SearchCore.ts',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    resetMocks: true,
    restoreMocks: true,
  }; 

export default config;