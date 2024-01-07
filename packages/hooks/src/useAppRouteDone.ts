import { logger } from '@min-kit/extends'
import { eventCenter } from '@tarojs/taro'

import { createEventListener } from './createEventListener'

try {
  if (typeof wx === 'undefined' || typeof wx.onAppRouteDone !== 'function') {
    throw new Error('Not support wx.onAppRouteDone')
  }

  wx.onAppRouteDone((res) => {
    eventCenter.trigger('wx.onAppRouteDone', res)
  })
  logger.debug('#useAppRouteDone', 'delegated wx.onAppRouteDone')
} catch (error) {
  logger.warn('#useAppRouteDone', error)
}

/**
 * on`wx.onAppRouteDone`
 * @supported weapp
 */
export const useAppRouteDone__unstable = createEventListener<wx.onAppRoute.CallbackResult>('wx.onAppRouteDone')
