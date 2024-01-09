export namespace TaroCLI {
  export type argv = {
    /** 目标环境 */
    mode: Mode
    /** Watch mode */
    watch?: boolean
    /** 启用analyzer */
    analyzer: boolean
    /** command */
    command: string
  } & Record<string, string>
}

const normalizeMode = (mode: string): Mode => {
  if (mode === 'production') return 'prod'
  else if (!mode || mode === 'development') return 'dev'
  return mode as Mode
}

export const argv = ((args: TaroCLI.argv) => {
  args.mode = normalizeMode(args.mode)
  // set env
  process.env.TARO_MODE = args.mode

  args.analyzer = !!args.analyzer && !process.env.CI
  args.command = args._?.at(0) ?? ''

  return args
})(require('minimist')(process.argv.slice(2)))
