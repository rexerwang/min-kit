import { Current, document, logger } from '@miniapp/extends'
import { useMount } from '@miniapp/hooks'
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro'

import Event from './event'

import type { IShareMenu, IShareProps } from './types'

const defaultMessage = {}

const getButtonMessage = (id: string) => {
  if (!id) return

  const button = document.getElementById(id)
  if (button?.props && button.props.openType === 'share') {
    Event.trigger(id)
    return (button.props as IShareProps).message
  }
}

/**
 * 分享Hook
 *
 * ***仅在页面级组件中使用***
 *
 * 按需添加页面配置:
 * ```ts
 * definePageConfig({
 *   enableShareAppMessage: true,
 *   enableShareTimeline: true,
 * })
 * ```
 */
export function useShareMessage(menu: IShareMenu = {}) {
  useShareAppMessage(({ from, target }) => {
    switch (from) {
      case 'button':
        return getButtonMessage(target?.['id']) ?? defaultMessage
      case 'menu':
        menu.onShareAppMessage?.()
        return menu.message ?? defaultMessage
      default:
        return defaultMessage
    }
  })

  useShareTimeline(() => {
    menu.onShareTimeline?.()
    return menu.timeline ?? menu.message ?? defaultMessage
  })

  useMount(() => {
    const config = Current.page?.config
    if (config && !config.enableShareAppMessage) {
      logger.error('#useShareMessage', `🚫 ${Current.router?.path} 未配置"enableShareAppMessage"，分享不可用‼`)
    }
  })
}
