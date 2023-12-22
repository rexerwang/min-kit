import { logger, selectNodeContext } from '@min-kit/extends'
import { useEffect, useRef } from 'react'

import { useMemoizedFn } from './useMemoizedFn'

export function useNodeContext<T>(id: string) {
  const ctxRef = useRef<T | null>(null)

  const getContext = useMemoizedFn(async () => {
    try {
      ctxRef.current = await selectNodeContext<T>(id)
    } catch (error) {
      logger.error('#useNodeContext', { id }, error)
    }
  })

  useEffect(() => {
    getContext()
  }, [id])

  return [ctxRef.current, getContext] as const
}
