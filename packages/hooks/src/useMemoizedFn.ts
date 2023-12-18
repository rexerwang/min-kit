/**
 * Fork from https://github.com/alibaba/hooks/blob/v3.7.8/packages/hooks/src/useMemoizedFn/index.ts
 * @license https://github.com/alibaba/hooks/blob/v3.7.8/LICENSE
 */

import { useRef } from 'react'

type noop = (this: any, ...args: any[]) => any

type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>

export function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn)
  fnRef.current = fn

  // unnecessary when not use react-devtool
  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  // fnRef.current = useMemo(() => fn, [fn])

  const memoizedFn = useRef<PickFunction<T>>()
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args)
    }
  }

  return memoizedFn.current as T
}
