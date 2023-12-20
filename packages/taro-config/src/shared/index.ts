import { writeFile } from 'node:fs/promises'

import { chalk, printLog, processTypeEnum } from '@tarojs/helper'

import { TaroCLI } from '../types'

export const argv = ((args: TaroCLI.argv) => {
  switch (args.mode as string) {
    case 'prod':
    case 'production':
      args.mode = 'prod'
      break
    case 'development':
    case '':
    case undefined:
      args.mode = 'dev'
  }

  args.analyzer = !!args.analyzer && !process.env.CI
  args._ = args._?.at(0) ?? ''

  // set env
  process.env.TARO_MODE = args.mode

  return args
})(require('minimist')(process.argv.slice(2)))

export async function writeJson(filename: string, obj: any) {
  await writeFile(filename, JSON.stringify(obj, null, 2))
}

export const logger = {
  error(e: Error) {
    printLog(processTypeEnum.ERROR, e.message)
    if (e.stack) console.error(e.stack)
    process.exit(1)
  },
  generate(filePath: string) {
    printLog(processTypeEnum.GENERATE, chalk.green.underline(filePath))
  },
  remind(message: string) {
    printLog(processTypeEnum.REMIND, message)
  },
  exec(message: string) {
    printLog(processTypeEnum.START, chalk.green(argv._) + ' ' + message)
  },
}
