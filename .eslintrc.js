/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: ['taro/react', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['import', 'simple-import-sort', 'prettier'],
  env: {
    browser: true,
  },
  globals: {},
  parserOptions: {
    requireConfigFile: false, // ignore require .babelrc
  },
  rules: {
    '@typescript-eslint/no-useless-constructor': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'simple-import-sort/imports': [
      'error',
      {
        // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/src/imports.js#L5
        // https://github.com/NervJS/taro/blob/next/.eslintrc.js#L54
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Node.js builtins prefixed with `node:`.
          ['^node:'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
          // Types Group
          ['^node:.*\\u0000$', '^@?\\w.*\\u0000$', '(?<=\\u0000)$', '^\\..*\\u0000$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
    // conflict with `simple-import-sort/imports`
    'import/first': 'off',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-commonjs': 'off',
  },
  overrides: [
    {
      files: ['*.test.ts?(x)', 'packages/jest/**'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
}
