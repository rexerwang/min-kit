import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'

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
  hooks: {
    async 'rollup:dts:build'() {
      await copyFile(resolve(__dirname, 'types/taro-env.d.ts'), resolve(__dirname, 'dist/taro-env.d.ts'))
    },
  },
})
