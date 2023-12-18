import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineBuildConfig } from 'unbuild'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineBuildConfig({
  rollup: {
    dts: {
      tsconfig: resolve(__dirname, 'tsconfig.json'),
      compilerOptions: {
        preserveSymlinks: true,
      },
    },
  },
})
