/**
 * @typedef {import('jest').Config Config}
 */

const defineJestConfig = require('./config/taro-jest/index').default

/** @type {Config} */
const baseConfig = defineJestConfig({
  globalSetup: require.resolve('./config/globalSetup.js'),
  setupFilesAfterEnv: [require.resolve('./config/setupAfterEnv.js')],
  testEnvironment: '@happy-dom/jest-environment', // 'jsdom'
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts?(x)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts?(x)', '!**/__tests__/**'],
  coverageReporters: process.env.CI ? ['json'] : ['html', 'text'],
  passWithNoTests: true,
})

/**
 * defineJestConfig
 * @param {Partial<Config>} [config]
 * @returns {Config}
 */
module.exports = (config = {}) => {
  let { setupFilesAfterEnv, collectCoverageFrom, ...configs } = baseConfig

  if (Array.isArray(config.setupFilesAfterEnv)) {
    setupFilesAfterEnv = setupFilesAfterEnv.concat(config.setupFilesAfterEnv)
  }

  if (Array.isArray(config.collectCoverageFrom)) {
    collectCoverageFrom = [collectCoverageFrom[0], ...config.collectCoverageFrom, collectCoverageFrom[1]]
  }

  return {
    ...configs,
    ...config,
    setupFilesAfterEnv,
    collectCoverageFrom,
  }
}
