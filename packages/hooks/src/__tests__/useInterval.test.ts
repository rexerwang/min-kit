import { renderHook } from '@min-kit/jest'

import { useInterval } from '../useInterval'

const setup = (fn: () => void, ms: number) => renderHook(() => useInterval(fn, ms))

describe('useInterval', () => {
  jest.useFakeTimers()

  it('should useInterval did work', () => {
    const fn = jest.fn()
    setup(fn, 20)
    expect(fn).not.toHaveBeenCalled()
    jest.advanceTimersByTime(70)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('interval should stop', () => {
    const fn = jest.fn()
    setup(fn, 0)
    jest.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(0)

    setup(fn, -20)
    jest.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(0)
  })

  it('interval should be clear', () => {
    const fn = jest.fn()
    const hook = setup(fn, 20)

    expect(fn).not.toHaveBeenCalled()
    hook.result.current()
    jest.advanceTimersByTime(70)
    expect(fn).toHaveBeenCalledTimes(0)
  })
})
