/**
 * Fork from https://github.com/alibaba/hooks/blob/v3.7.8/packages/hooks/src/useLatest/index.ts
 * @license https://github.com/alibaba/hooks/blob/v3.7.8/LICENSE
 */

import { useRef } from 'react'

export function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value

  return ref
}
