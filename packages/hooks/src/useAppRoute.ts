import { logger } from '@miniapp/extends'
import { eventCenter } from '@tarojs/taro'

import { createEventListener } from './createEventListener'

if (typeof wx !== 'undefined' && typeof wx.onAppRoute === 'function') {
  wx.onAppRoute((res) => {
    eventCenter.trigger('wx.onAppRoute', res)
  })
  logger.debug('#useAppRoute', 'registered')
} else {
  logger.error('#useAppRoute', new Error('Not support wx.onAppRoute'))
}

/**
 * on`wx.onAppRoute`
 * @supported weapp
 */
export const useAppRoute__unstable = createEventListener<wx.onAppRoute.CallbackResult>('wx.onAppRoute')
