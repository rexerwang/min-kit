import { useId, useMemo } from 'react'

export function useTaroId() {
  const id = useId()
  return useMemo(() => 'taro' + id, [id])
}
