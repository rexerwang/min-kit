import { renderHook } from '@min-kit/jest'
import _shares from '@min-kit/shared'

import { useThrottleFn } from '../useThrottleFn'

const throttleStub = Object.assign(jest.fn(), { cancel: jest.fn() })
const throttleSpy = jest.spyOn(_shares, 'throttle').mockImplementation(jest.fn().mockReturnValue(throttleStub))

describe('useThrottleFn', () => {
  it('should useThrottleFn did work', () => {
    const fn = jest.fn()
    const { result, unmount } = renderHook(() => useThrottleFn(fn))
    expect(throttleSpy).toHaveBeenCalledWith(fn, 1000, {})
    expect(result.current).toBe(throttleStub)

    unmount()
    expect(throttleStub.cancel).toHaveBeenCalled()
  })
})
