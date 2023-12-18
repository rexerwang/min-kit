import { logger } from '@miniapp/extends'
import { eventCenter } from '@tarojs/taro'

import { createEventListener } from './createEventListener'

if (typeof wx !== 'undefined' && typeof wx.onAppRouteDone === 'function') {
  wx.onAppRouteDone((res) => {
    eventCenter.trigger('wx.onAppRouteDone', res)
  })
  logger.debug('#useAppRouteDone', 'registered')
} else {
  logger.error('#useAppRouteDone', new Error('Not support wx.onAppRouteDone'))
}

/**
 * on`wx.onAppRouteDone`
 * @supported weapp
 */
export const useAppRouteDone__unstable = createEventListener<wx.onAppRoute.CallbackResult>('wx.onAppRouteDone')
