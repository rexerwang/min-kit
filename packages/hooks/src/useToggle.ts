import { useRef, useState } from 'react'

export function useToggle(bool: boolean) {
  const [state, setState] = useState(bool)

  const toggle = useRef((val?: boolean) => {
    if (val !== undefined) setState(val)
    else setState((v) => !v)
  })

  return [state, toggle.current] as const
}
