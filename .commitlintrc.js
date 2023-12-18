// https://commitlint.js.org/#/reference-configuration
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 300],
    'body-max-line-length': [2, 'always', 500],
  },
}
