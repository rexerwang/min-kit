const defineJestConfig = require('@tarojs/test-utils-react/dist/jest.js').default

module.exports = defineJestConfig({
  passWithNoTests: true,
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/__tests__/*.test.ts?(x)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts?(x)'],
  coverageReporters: ['clover', 'json', 'lcov'], //['html', 'text-summary', 'cobertura'],
})
