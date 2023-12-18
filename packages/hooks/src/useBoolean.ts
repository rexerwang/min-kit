import { useState } from 'react'

import { useUpdateEffect } from './useUpdateEffect'

export function useTrue(bool: boolean) {
  const [state, setState] = useState(false)

  useUpdateEffect(() => {
    if (bool === true) setState(true)
  }, [bool])

  return state
}

export function useFalse(bool: boolean) {
  const [state, setState] = useState(true)

  useUpdateEffect(() => {
    if (bool === false) setState(false)
  }, [bool])

  return state
}
