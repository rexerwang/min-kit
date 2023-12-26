import { defineBuildConfig } from 'unbuild'

const isProd = !process.argv.includes('--dev')

export default defineBuildConfig({
  clean: isProd,
  rollup: {
    esbuild: { minify: isProd },
  },
})
