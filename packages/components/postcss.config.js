const { plugins } = require('@min-kit/helper/config').postcss({ tailwindcss: true })

module.exports = { plugins: plugins.concat([require('cssnano')]) }
