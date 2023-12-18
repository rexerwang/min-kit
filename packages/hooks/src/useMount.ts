import { useEffect, useRef } from 'react'

export function useMount(fn: () => void) {
  const fnRef = useRef(fn)

  useEffect(() => {
    fnRef.current()
  }, [])
}
