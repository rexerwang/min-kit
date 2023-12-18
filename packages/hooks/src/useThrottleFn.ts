import { throttle } from '@miniapp/shared'
import { useMemo } from 'react'

import { useUnmount } from './useUnmount'

export interface ThrottleOption {
  /**
   * The number of milliseconds to throttle invocations to
   *
   * @default 1000
   */
  wait?: number
  /**
   * Specify invoking on the leading edge of the timeout
   *
   * @default true
   */
  leading?: boolean
  /**
   * Specify invoking on the trailing edge of the timeout
   *
   * @default true
   */
  trailing?: boolean
}

export function useThrottleFn<T extends (..._: any[]) => any>(fn: T, { wait = 1000, ...options }: ThrottleOption = {}) {
  const throttled = useMemo(() => {
    return throttle(fn, wait, options)
  }, [fn])

  useUnmount(() => {
    throttled.cancel()
  })

  return throttled
}
