import Logger from './Logger'

export function getLogger(name: string) {
  return new Logger(name)
}

export const logger = getLogger('👽')
