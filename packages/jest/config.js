const defineJestConfig = require('./config/taro-jest/index').default

module.exports = defineJestConfig({
  globals: require('./config/globals'),
  globalSetup: require.resolve('./config/globalSetup.js'),
  setupFilesAfterEnv: [require.resolve('./config/setupAfterEnv.js')],
  testEnvironment: '@happy-dom/jest-environment', // 'jsdom'
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts?(x)'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts?(x)',
    '!**/__tests__/**',
    // ignore shared...
    '!**/{debounce,throttle}.ts',
    // ignore components...
    '!src/debugger/**',
    // ignore extends...
    '!src/config.ts',
    '!src/current.ts',
    '!src/document.ts',
    '!src/storage.ts',
    '!src/selector.ts',
    '!src/systemInfo.ts',
  ],
  coverageReporters: ['clover', 'json', 'lcov', 'text-summary'],
  passWithNoTests: true,
})

// console.debug('jest.config', module.exports)
