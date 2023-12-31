const defineJestConfig = require('@tarojs/test-utils-react/dist/jest.js').default

module.exports = defineJestConfig({
  globals: require('./config/globals'),
  setupFilesAfterEnv: [require.resolve('./config/setupAfterEnv.js')],
  testEnvironment: '@happy-dom/jest-environment', // 'jsdom'
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts?(x)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts?(x)', '!**/__tests__/**', '!**/{debounce,throttle}.ts'],
  coverageReporters: ['clover', 'json', 'lcov', 'text-summary'],
  passWithNoTests: true,
})
