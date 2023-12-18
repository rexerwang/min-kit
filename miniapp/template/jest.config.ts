const defineJestConfig = require('@tarojs/test-utils-react/dist/jest.js').default

const aliasMapper = () => {
  const aliases = require('./tsconfig.json')?.compilerOptions.paths
  if (!aliases) return {}

  return Object.entries(aliases).reduce((mapper, [key, value]) => {
    mapper[key.replace(/\/\*$/, '/(.+)$')] = '<rootDir>/' + (value as string[])[0].replace(/\/\*$/, '/$1')
    return mapper
  }, {})
}

module.exports = defineJestConfig({
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/__tests__/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: aliasMapper(),
  collectCoverageFrom: ['(src|packages)/**/*.[jt]s?(x)'],
  coverageReporters: ['html', 'text-summary', 'cobertura'],
})
