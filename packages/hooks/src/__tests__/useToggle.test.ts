import { act, renderHook } from '@min-kit/jest'

import { useToggle } from '../useToggle'

describe('useToggle', () => {
  it('should useToggle did work', () => {
    const { result } = renderHook(useToggle, { initialProps: false })

    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1](true)
    })
    expect(result.current[0]).toBe(true)
  })
})
