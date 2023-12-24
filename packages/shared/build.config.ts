import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: !process.argv.includes('--no-clean'),
})
