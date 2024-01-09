const { plugins } = require('@min-kit/helper/presets').postcss({ tailwindcss: true })

module.exports = { plugins: plugins.concat([require('cssnano')]) }
