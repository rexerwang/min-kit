module.exports = require('@min-kit/jest/config')({
  collectCoverageFrom: [
    '!src/config.ts',
    '!src/current.ts',
    '!src/document.ts',
    '!src/storage.ts',
    '!src/selector.ts',
    '!src/systemInfo.ts',
  ],
})
