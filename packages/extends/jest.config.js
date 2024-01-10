module.exports = require('@min-kit/jest/config')({
  collectCoverageFrom: [
    // No need to test
    '!src/{current,document}.ts',
  ],
})
