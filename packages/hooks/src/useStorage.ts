import { getStorage, setStorage } from '@miniapp/extends'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { useMemoizedFn } from './useMemoizedFn'

export type UseStorageOption<T> = {
  defaultValue: T
  onlyUpdate?: 'storage' | 'state'
}

type StateAction<S> = Dispatch<SetStateAction<S>>

export function useStorage<S>(key: string, option: UseStorageOption<S>): [S, StateAction<S>]

export function useStorage<S>(key: string, option?: UseStorageOption<S>): [S | undefined, StateAction<S | undefined>]

export function useStorage<S>(key: string, option?: UseStorageOption<S>) {
  const [value, setValue] = useState(option?.defaultValue)

  const update: StateAction<S | undefined> = useMemoizedFn((state) => {
    const val = typeof state === 'function' ? (state as Function)(value) : state
    option?.onlyUpdate !== 'storage' && setValue(val)
    option?.onlyUpdate !== 'state' && setStorage(key, val)
  })

  useEffect(() => {
    getStorage<S>(key).then((val) => {
      if (val !== undefined) setValue(val)
    })
  }, [key])

  return [value, update]
}
