module.exports = require('@min-kit/jest/config')({
  collectCoverageFrom: ['!src/debugger/{hooks,service,store}/**'],
})
