import Logger, { IOption } from './Logger'

export function getLogger(name: string, option?: IOption) {
  return new Logger(name, option)
}

export const logger = getLogger('👽')
