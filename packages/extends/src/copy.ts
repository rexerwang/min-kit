import { isEmpty, isString } from '@min-kit/shared'
import { setClipboardData } from '@tarojs/taro'

import { logger } from './logger'

export async function copy(content: any) {
  if (isEmpty(content)) return false

  try {
    const data = isString(content) ? content : JSON.stringify(content)
    await setClipboardData({ data })
    return true
  } catch (error) {
    logger.error('#copy', error)
    return false
  }
}
