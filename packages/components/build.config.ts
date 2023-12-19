import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: false,
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
})
