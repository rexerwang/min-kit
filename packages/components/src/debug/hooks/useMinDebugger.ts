import { getRootElement, SystemInfo } from '@min-kit/extends'
import { useAppRoute__unstable, useAppRouteDone__unstable, useMount } from '@min-kit/hooks'
import { nextTick } from '@tarojs/taro'
import { useRef } from 'react'

import { mountPortal } from '../..'
import { RequestService } from '../service/request.service'
import { uiStore } from '../store'
import { IUserOptions } from '../types'
import { MinDebugger } from '../ui/debugger'

export interface MinDebugOptions extends IUserOptions {}

const defaultOptions: MinDebugOptions = {
  user: {
    getToken: () => '',
    getUserInfo: () => Promise.resolve(),
  },
}

/**
 * use {@link MinDebugger} in hooks way.
 *
 * Only need to import once in the miniapp entry `app.ts`, it can be applied to all pages.
 */
export function useMinDebugger(options = defaultOptions) {
  const exists = useRef(new Set<string>())
  const position = useRef(uiStore.position())

  useMount(() => {
    if (SystemInfo.enableDebug) {
      RequestService.start()
    }
  })

  useAppRoute__unstable(() => {
    if (SystemInfo.enableDebug) {
      // sync position only when switching pages to avoid moving jitter issues.
      uiStore.setPosition(position.current)
    }
  })

  useAppRouteDone__unstable(() => {
    if (!SystemInfo.enableDebug) return

    const uid = getRootElement()?.uid
    if (uid && !exists.current.has(uid)) {
      nextTick(() => {
        mountPortal(MinDebugger, {
          onMove: (e) => (position.current = e),
          user: options.user,
        })
        exists.current.add(uid)
      })
    }
  })
}
