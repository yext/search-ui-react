import type { Config } from 'jest';

const config: Config = {
    bail: 0,
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**",
      "!src/models/**"
    ],
    coverageDirectory: "coverage/unit",
    moduleFileExtensions: [
      "js",
      "ts",
      "jsx",
      "tsx"
    ],
    moduleDirectories: [
      "node_modules",
      "<rootDir>"
    ],
    setupFilesAfterEnv: [
      "<rootDir>/tests/__setup__/setup-env.ts"
    ],
    testEnvironment: "jsdom",
    testMatch: [
      "<rootDir>/tests/**/*.test.ts?(x)"
    ],
    testPathIgnorePatterns: [
      "<rootDir>/tests/__setup__/*",
      "<rootDir>/tests/__fixtures__/*"
    ],
    transformIgnorePatterns: [
      "/node_modules/(?!(@yext/search-headless-react)/|lodash-es)"
    ],
    moduleNameMapper: {
      "^(.+)\\.js$": "$1",
      "./SearchCore": "<rootDir>/tests/__fixtures__/core/SearchCore.ts"
    },
    resetMocks: true,
    restoreMocks: true,
    transform: {
      "\\.[jt]sx?$": [
        "ts-jest",
        {
          tsconfig: {
            allowSyntheticDefaultImports: true,
            esModuleInterop: true,
            allowJs: true,
            target: "ESNext",
            jsx: "react-jsx"
          },
          diagnostics: {
            ignoreCodes: [
              1343
            ]
          }
        }
      ]
    }
};

export default config;