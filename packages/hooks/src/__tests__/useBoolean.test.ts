import { renderHook } from '@min-kit/jest'

import { useFalse, useTrue } from '../useBoolean'

describe('useBoolean', () => {
  it('useTrue', () => {
    const { result, rerender } = renderHook(useTrue, { initialProps: false })
    expect(result.current).toBe(false)

    rerender(true)
    expect(result.current).toBe(true)

    rerender(false)
    expect(result.current).toBe(true)
  })

  it('useFalse', () => {
    const { result, rerender } = renderHook(useFalse, { initialProps: true })
    expect(result.current).toBe(true)

    rerender(false)
    expect(result.current).toBe(false)

    rerender(true)
    expect(result.current).toBe(false)
  })
})
