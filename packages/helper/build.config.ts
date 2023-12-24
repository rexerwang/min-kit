import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: !process.argv.includes('--no-clean'),
  entries: ['compile/index', 'compile/plugin-prebuild', 'config/index', 'runtime/index'],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
