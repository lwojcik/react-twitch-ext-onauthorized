module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.{ts,tsx}",
    "!**/**.{d.ts}",
    "!src/**/*.d.ts",
    "!**/node_modules/**",
    "!**/dist/**",
  ],
  automock: false,
  // "coverageThreshold": {
  //   "global": {
  //     "branches": 100,
  //     "functions": 100,
  //     "lines": 100,
  //     "statements": 100
  //   }
  // },
  // "setupFiles": [
  //   "dotenv/config"
  // ],
};
