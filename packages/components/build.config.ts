import { exec } from 'node:child_process'
import { promisify } from 'node:util'

import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: false, // for hot-load
  entries: [
    'src/index',
    {
      builder: 'mkdist',
      input: 'styles',
      outDir: 'dist/styles',
    },
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      jsx: 'automatic',
    },
  },
  hooks: {
    async 'mkdist:done'() {
      await promisify(exec)('npx postcss dist/styles -d dist/styles')
    },
  },
})
