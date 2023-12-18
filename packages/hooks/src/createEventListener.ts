import { eventCenter } from '@tarojs/taro'
import { useEffect } from 'react'

import { useMemoizedFn } from './useMemoizedFn'

type AnyFunction = (..._: any[]) => any

interface EventEmitter {
  on(eventName: string, callback: AnyFunction): void
  off(eventName: string, callback: AnyFunction): void
}

export function createEventListener<T = any>(eventName: string, emitter: EventEmitter = eventCenter) {
  return function useEventListener(callback: (e: T) => void) {
    const memoized = useMemoizedFn(callback)

    useEffect(() => {
      emitter.on(eventName, memoized)
      return () => {
        emitter.off(eventName, memoized)
      }
    }, [])
  }
}
