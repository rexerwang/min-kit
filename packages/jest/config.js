const defineJestConfig = require('./config/taro-jest/index').default

const baseConfig = defineJestConfig({
  globalSetup: require.resolve('./config/globalSetup.js'),
  setupFilesAfterEnv: [require.resolve('./config/setupAfterEnv.js')],
  testEnvironment: '@happy-dom/jest-environment', // 'jsdom'
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts?(x)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts?(x)', '!**/__tests__/**'],
  coverageReporters: ['clover', 'json', 'lcov', 'text-summary'],
  passWithNoTests: true,
})

/**
 * defineJestConfig
 * @param {Partial<import('jest').Config>} [config]
 */
module.exports = (config = {}) => ({
  ...baseConfig,
  ...config,
  setupFilesAfterEnv: baseConfig.setupFilesAfterEnv.concat(config.setupFilesAfterEnv ?? []),
  collectCoverageFrom: baseConfig.collectCoverageFrom.concat(config.collectCoverageFrom ?? []),
})
