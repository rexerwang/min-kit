import type { StoreApi, UseBoundStore } from 'zustand'

type SelectorHooks<S> = S extends { getState: () => infer T } ? { [K in keyof T]: () => T[K] } : never

type AnyFns = Record<string, (..._: any[]) => any>

type StoreAddons<T, P> = {
  hooks?: T
  apis: P
}

export function combineStore<
  Store extends UseBoundStore<StoreApi<object>>,
  Hooks extends AnyFns = {},
  Apis extends AnyFns = {},
>(store: Store, addons = {} as StoreAddons<Hooks, Apis>) {
  const selectors = {} as SelectorHooks<Store>
  for (let k of Object.keys(store.getState())) {
    selectors[k] = () => store((s) => s[k])
  }

  return Object.assign(selectors, addons.hooks, { apis: addons.apis })
}
