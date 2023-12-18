import { useState } from 'react'

export function useSet<T>(initialState?: T[]) {
  const [state, setState] = useState<Set<T>>(new Set(initialState))

  const update = (cb: (set: Set<T>) => void) => {
    setState((v) => {
      const draft = new Set(v)
      cb(draft)
      return draft
    })
  }

  return [state, update] as const
}
