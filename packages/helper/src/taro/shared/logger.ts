import { chalk, printLog, processTypeEnum } from '@tarojs/helper'

import { argv } from './argv'

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
    printLog(processTypeEnum.START, chalk.green(argv.command) + ' ' + message)
  },
}
