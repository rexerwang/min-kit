import { useCallback, useEffect, useRef } from 'react'

import { useMemoizedFn } from './useMemoizedFn'

export function useInterval(fn: () => void, ms: number) {
  const timerCallback = useMemoizedFn(fn)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (ms > 0) timerRef.current = setInterval(timerCallback, ms)
    return clear
  }, [ms])

  return clear
}
