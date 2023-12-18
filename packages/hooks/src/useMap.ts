import { useState } from 'react'

export function useMap<K, V>() {
  const [state, setState] = useState<Map<K, V>>(new Map())

  const update = (cb: (set: Map<K, V>) => void) => {
    setState((v) => {
      const draft = new Map(v)
      cb(draft)
      return draft
    })
  }

  return [state, update] as const
}
