module.exports = {
    bail: 0,
    verbose: true,
    collectCoverage: false,
    collectCoverageFrom: [
      "src/components/**"
    ],
    coverageDirectory: "coverage/visual-regression",
    moduleFileExtensions: [
      "js",
      "json",
      "ts",
      "tsx"
    ],
    moduleDirectories: [
      "node_modules",
      "<rootDir>"
    ],
    resolver: "<rootDir>/tests/__setup__/resolver.ts",
    setupFilesAfterEnv: [
      "<rootDir>/tests/__setup__/setup-env.ts"
    ],
    testEnvironment: "jsdom",
    testMatch: [
      "<rootDir>/tests/storyshot.test.ts"
    ],
    testPathIgnorePatterns: [
      "<rootDir>/tests/__setup__/*",
      "<rootDir>/tests/__fixtures__/*"
    ],
    transformIgnorePatterns: [
      "/node_modules/(?!(@yext/search-headless-react)/)"
    ],
    moduleNameMapper: {
      "./SearchCore": "<rootDir>/tests/__fixtures__/core/SearchCore.ts",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    resetMocks: true,
    restoreMocks: true
  }