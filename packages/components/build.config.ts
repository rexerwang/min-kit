import { exec } from 'node:child_process'
import { resolve } from 'node:path'
import { promisify } from 'node:util'

import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: !process.argv.includes('--no-clean'),
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
      const input = resolve(__dirname, 'dist/styles')
      await promisify(exec)(`pnpm postcss ${input} -d ${input}`)
    },
  },
})
