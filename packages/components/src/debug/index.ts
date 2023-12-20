import { getRootElement, SystemInfo } from '@miniapp/extends'
import { useAppRoute__unstable, useAppRouteDone__unstable, useMount } from '@miniapp/hooks'
import { nextTick } from '@tarojs/taro'
import { useRef } from 'react'

import { mountPortal } from '../portal'
import { RequestService } from './service/request.service'
import { uiStore } from './store'
import Debugger from './ui/debugger'

import type { IDebugOptions } from './types'

const defaultOptions: IDebugOptions = {
  user: {
    getToken: () => '',
    getUserInfo: () => Promise.resolve(),
  },
}

/** debugger 面板 */
export function useDebug(options = defaultOptions) {
  const exists = useRef(new Set<string>())
  const position = useRef(uiStore.position())

  useMount(() => {
    if (SystemInfo.enableDebug) {
      RequestService.start()
    }
  })

  useAppRoute__unstable(() => {
    if (SystemInfo.enableDebug) {
      uiStore.setPosition(position.current)
    }
  })

  useAppRouteDone__unstable(() => {
    if (!SystemInfo.enableDebug) return

    const uid = getRootElement()?.uid
    if (uid && !exists.current.has(uid)) {
      nextTick(() => {
        mountPortal(Debugger, {
          onMove: (e) => (position.current = e),
          user: options.user,
        })
        exists.current.add(uid)
      })
    }
  })
}
