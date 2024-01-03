import { getStorageSync, removeStorageSync } from '@min-kit/extends'
import { act, renderHook, waitFor } from '@min-kit/jest'
import { setStorageSync } from '@tarojs/taro'

import { useStorage } from '../useStorage'

const key = 'useStorageKey'

describe('useStorage', () => {
  afterEach(() => {
    removeStorageSync(key)
  })

  it('should init state to defaultValue', () => {
    const { result } = renderHook(() => useStorage(key, { defaultValue: 1 }))

    expect(result.current[0]).toBe(1)
  })

  it('should init state from storage', async () => {
    setStorageSync(key, 2)
    const { result } = renderHook(() => useStorage(key))

    await waitFor(() => {
      expect(result.current[0]).toBe(2)
    })
  })

  it('should update state and storage', async () => {
    const { result } = renderHook(() => useStorage(key))

    expect(result.current[0]).toBeUndefined()

    act(() => {
      result.current[1](1)
    })

    expect(result.current[0]).toBe(1)
    expect(getStorageSync(key)).toBe(1)

    act(() => {
      result.current[1]((v) => v + 1)
    })

    expect(result.current[0]).toBe(2)
    expect(getStorageSync(key)).toBe(2)
  })

  it('should update state only', async () => {
    const { result } = renderHook(() => useStorage(key, { defaultValue: 1, onlyUpdate: 'state' }))

    act(() => {
      result.current[1](2)
    })

    expect(result.current[0]).toBe(2)
    expect(getStorageSync(key)).toBeFalsy()
  })

  it('should update storage only', async () => {
    const { result } = renderHook(() => useStorage(key, { defaultValue: 1, onlyUpdate: 'storage' }))

    act(() => {
      result.current[1](2)
    })

    expect(result.current[0]).toBe(1)
    expect(getStorageSync(key)).toBe(2)
  })
})
