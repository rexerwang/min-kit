import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { defineBuildConfig } from 'unbuild'

const isProd = !process.argv.includes('--dev')

export default defineBuildConfig({
  clean: isProd,
  rollup: {
    esbuild: { minify: isProd },
  },
  hooks: {
    async 'rollup:dts:build'(ctx, build) {
      const banner = await readFile(resolve(__dirname, 'types/shims.d.ts'), { encoding: 'utf8' })
      const write = build.write
      build.write = (outputOptions) => write({ ...outputOptions, banner })
    },
  },
})
