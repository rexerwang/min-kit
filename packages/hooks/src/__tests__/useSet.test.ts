import { act, renderHook } from '@min-kit/jest'

import { useSet } from '../useSet'

describe('useSet', () => {
  it('should update the set correctly', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]))

    act(() => {
      const [, update] = result.current
      update((set) => {
        set.add(4)
        set.delete(2)
      })
    })

    expect(result.current[0].has(1)).toBe(true)
    expect(result.current[0].has(2)).toBe(false)
    expect(result.current[0].has(3)).toBe(true)
    expect(result.current[0].has(4)).toBe(true)
  })
})
