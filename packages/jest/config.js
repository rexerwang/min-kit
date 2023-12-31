const defineJestConfig = require('@tarojs/test-utils-react/dist/jest.js').default

module.exports = defineJestConfig({
  setupFilesAfterEnv: [require.resolve('./config/setupAfterEnv.js')],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts?(x)'],
  globals: require('./config/globals'),
  collectCoverageFrom: ['<rootDir>/src/**/*.ts?(x)', '!**/__tests__/**', '!**/{debounce,throttle}.ts'],
  coverageReporters: ['clover', 'json', 'lcov', 'text-summary'],
  passWithNoTests: true,
})
