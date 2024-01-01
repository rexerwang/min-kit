import { Logger, LoggerOption } from './Logger'

export function getLogger(name: string, option?: LoggerOption) {
  return new Logger(name, option)
}

export const logger = getLogger('👽')
