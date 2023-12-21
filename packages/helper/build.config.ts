import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['compile/index', 'compile/plugin-prebuild', 'config/index', 'runtime/index'],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
