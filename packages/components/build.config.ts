import { exec } from 'node:child_process'
import { resolve } from 'node:path'
import { promisify } from 'node:util'

import { defineBuildConfig } from 'unbuild'

const isProd = !process.argv.includes('--dev')

export default defineBuildConfig({
  clean: isProd,
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
      minify: isProd,
    },
  },
  hooks: {
    async 'mkdist:done'() {
      const input = resolve(__dirname, 'dist/styles')
      await promisify(exec)(`pnpm postcss ${input} -d ${input}`)
    },
  },
})
