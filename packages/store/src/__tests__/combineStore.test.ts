import { act, renderHook } from '@min-kit/jest'

import { combineStore, createStore } from '../index'

const initialState = {
  title: { enable: false, text: 'Title' },
}

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

describe('combineStore', () => {
  it('should generate selectors', () => {
    const combinedStore = combineStore(store)

    expect(renderHook(() => combinedStore.title()).result.current).toBe(initialState.title)
    expect(renderHook(() => combinedStore.enableTitle()).result.current).toEqual(expect.any(Function))
    expect(renderHook(() => combinedStore.updateTitle()).result.current).toEqual(expect.any(Function))
    expect(combinedStore.apis).toBeUndefined()
  })

  it('should generate selectors with addons', () => {
    const combinedStore = combineStore(store, {
      hooks: {
        useTitleText() {
          return store((state) => state.title.text)
        },
      },
      apis: {
        updateTitle: store.getState().updateTitle,
      },
    })

    const { result } = renderHook(() => combinedStore.useTitleText())
    expect(result.current).toBe('Title')

    act(() => {
      combinedStore.apis.updateTitle('TestTitle')
    })

    expect(result.current).toBe('TestTitle')
  })
})
