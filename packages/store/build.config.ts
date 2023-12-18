import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineBuildConfig } from 'unbuild'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineBuildConfig({
  hooks: {
    async 'rollup:dts:build'(ctx, build) {
      const banner = await readFile(resolve(__dirname, 'types/shims.d.ts'), { encoding: 'utf8' })
      const write = build.write
      build.write = (outputOptions) => write({ ...outputOptions, banner })
    },
  },
})
