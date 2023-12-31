'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const path_1 = require('path')

exports.default = {
  bail: 1,
  verbose: false,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
    customExportConditions: ['node', 'node-addons'],
  },
  testMatch: ['<rootDir>/__test__/**/*.test.{js,ts}'],
  setupFiles: [(0, path_1.resolve)(__dirname, './jest.setup.js')],
  collectCoverageFrom: ['<rootDir>/__test__/**/*.{js,ts}', '!**/__test__/**'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': (0, path_1.resolve)(__dirname, './babel-transformer.js'),
  },
  transformIgnorePatterns: [],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    '@tarojs/taro$': (0, path_1.resolve)(__dirname, './runtime/taro-h5.js'),
    '@tarojs/components$': '@tarojs/components/lib/react/index',
  },
  globals: {
    ENABLE_INNER_HTML: true,
    ENABLE_ADJACENT_HTML: true,
    ENABLE_SIZE_APIS: true,
    DEPRECATED_ADAPTER_COMPONENT: false,
    ENABLE_TEMPLATE_CONTENT: true,
    ENABLE_MUTATION_OBSERVER: true,
    ENABLE_CLONE_NODE: true,
    ENABLE_CONTAINS: true,
    __TARO_FRAMEWORK__: 'react',
    'ts-jest': {
      diagnostics: false,
      tsconfig: {
        jsx: 'react-jsx',
        allowJs: true,
        target: 'ES6',
      },
    },
    'babel-jest': {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
          },
        ],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
      ],
    },
  },
}
