import { act, renderHook } from '@min-kit/jest'

import { createStore } from '../createStore'

const initialState = {
  title: { enable: false, text: 'Title' },
}

describe('createStore', () => {
  it('should create store by initial state', () => {
    const store = createStore(initialState)
    expect(store.getState()).toEqual(initialState)
  })

  it('should create store combine state & actions', () => {
    const store = createStore(initialState, (set) => ({
      enableTitle(enable: boolean) {
        set((state) => {
          state.title.enable = enable
        })
      },
      updateTitle(text: string) {
        set((state) => {
          state.title.text = text
        })
      },
    }))

    const { result } = renderHook(() => store())

    act(() => {
      result.current.enableTitle(true)
    })

    expect(result.current.title.enable).toBe(true)
  })
})
