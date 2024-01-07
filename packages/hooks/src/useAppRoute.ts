import { logger } from '@min-kit/extends'
import { eventCenter } from '@tarojs/taro'

import { createEventListener } from './createEventListener'

try {
  if (typeof wx === 'undefined' || typeof wx.onAppRoute !== 'function') {
    throw new Error('Not support wx.onAppRoute')
  }

  wx.onAppRoute((res) => {
    eventCenter.trigger('wx.onAppRoute', res)
  })
  logger.debug('#useAppRoute', 'delegated wx.onAppRoute')
} catch (error) {
  logger.warn('#useAppRoute', error)
}

/**
 * on`wx.onAppRoute`
 * @supported weapp
 */
export const useAppRoute__unstable = createEventListener<wx.onAppRoute.CallbackResult>('wx.onAppRoute')
