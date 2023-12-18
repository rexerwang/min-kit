import { create, type StateCreator } from 'zustand'
import { combine } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

/**
 * createStore with `immer` & `combine` middleware
 *
 * @param initialState initialState. it should contains ALL fields, and optional fields should be set to `undefined`.
 * @param actionCreator actionCreator
 */
export function createStore<T extends object, U extends object>(
  initialState: T,
  actionCreator: StateCreator<T, [['zustand/immer', never]], [], U> = () => ({}) as U,
) {
  return create(immer(combine(initialState, actionCreator)))
}
