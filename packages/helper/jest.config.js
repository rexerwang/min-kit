module.exports = require('@min-kit/jest/config')({
  testMatch: ['<rootDir>/runtime/__tests__/**/*.test.ts?(x)'],
  collectCoverageFrom: ['runtime/**'],
})
