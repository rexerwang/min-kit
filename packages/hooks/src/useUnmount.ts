import { useEffect } from 'react'

import { useLatest } from './useLatest'

export function useUnmount(fn: () => void) {
  const fnRef = useLatest(fn)

  useEffect(() => () => fnRef.current(), [])
}
