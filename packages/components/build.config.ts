import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
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
  },
})
