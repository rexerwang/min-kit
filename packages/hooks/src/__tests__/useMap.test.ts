import { act, renderHook } from '@min-kit/jest'

import { useMap } from '../useMap'

describe('useMap', () => {
  it('should update the map correctly', () => {
    const { result } = renderHook(() => useMap<number, string>())

    act(() => {
      const [, update] = result.current
      update((map) => {
        map.set(1, 'one')
        map.set(2, 'two')
      })
    })

    expect(result.current[0].get(1)).toBe('one')
    expect(result.current[0].get(2)).toBe('two')
  })
})
