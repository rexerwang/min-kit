import { renderHook } from '@min-kit/jest'

import { useUpdateEffect } from '../useUpdateEffect'

describe('useUpdateEffect', () => {
  it('should work with no deps', async () => {
    let state = 1
    const hook = renderHook(() =>
      useUpdateEffect(() => {
        state = 2
      }),
    )
    expect(state).toBe(1)
    hook.rerender()
    expect(state).toBe(2)
  })

  it('should work with deps', () => {
    let state = 1
    const hook = renderHook(() =>
      useUpdateEffect(() => {
        state = 3
      }, [state]),
    )
    expect(state).toBe(1)
    hook.rerender()
    expect(state).toBe(1)
    state = 2
    hook.rerender()
    expect(state).toBe(3)
  })
})
