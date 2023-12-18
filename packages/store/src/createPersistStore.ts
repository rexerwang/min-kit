import { create, type StateCreator } from 'zustand'
import { combine, createJSONStorage, persist, type PersistOptions } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { StateStorageImpl } from './StateStorageImpl'

type Write<T extends object, U extends object> = Omit<T, keyof U> & U

/**
 * createStore with `persist` & `immer` & `combine` middleware
 *
 * @param name unique persist key
 * @param initialState initialState. it should contains ALL fields, and optional fields should be set to `undefined`.
 * @param actionCreator actionCreator
 * @param [options] {@link PersistOptions}
 */
export function createPersistStore<T extends object, U extends object, P extends object>(
  name: string,
  initialState: T,
  actionCreator: StateCreator<T, [['zustand/persist', unknown], ['zustand/immer', never]], [], U> = () => ({}) as U,
  /**
   * @description infer state type of `PersistOptions` with `immer` & `combine`
   */
  options?: Omit<PersistOptions<Write<T, U>, P>, 'name'>,
) {
  return create(
    persist(immer(combine(initialState, actionCreator)), {
      name,
      storage: createJSONStorage<any>(() => new StateStorageImpl()),
      ...options,
    }),
  )
}
