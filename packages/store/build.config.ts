import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  hooks: {
    async 'rollup:dts:build'(ctx, build) {
      const banner = await readFile(resolve(__dirname, 'types/shims.d.ts'), { encoding: 'utf8' })
      const write = build.write
      build.write = (outputOptions) => write({ ...outputOptions, banner })
    },
  },
})
