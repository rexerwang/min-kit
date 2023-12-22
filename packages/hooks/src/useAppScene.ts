import { scene } from '@min-kit/extends'
import { useState } from 'react'

import { useAppShow } from './useAppShow'

export function useAppScene() {
  const [state, setState] = useState(scene.current)

  useAppShow((res) => {
    setState(res.scene ?? scene.current)
  })

  return state
}
