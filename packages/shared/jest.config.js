module.exports = require('@min-kit/jest/config')({
  collectCoverageFrom: [
    // Fork from lodash
    '!src/{debounce,throttle}.ts',
  ],
})
