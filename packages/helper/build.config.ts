import { defineBuildConfig } from 'unbuild'

const isProd = !process.argv.includes('--dev')

export default defineBuildConfig({
  clean: isProd,
  entries: ['compile/index', 'compile/plugin-prebuild', 'config/index', 'runtime/index'],
  declaration: true,
  rollup: {
    emitCJS: true,
    esbuild: { minify: isProd },
  },
})
