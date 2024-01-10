import Taro from '@tarojs/taro'

import { getStorage, getStorageSync, removeStorage, removeStorageSync, setStorage, setStorageSync } from '../storage'

describe('storage', () => {
  const key = '1'
  const value = 1

  const getStorageSyncSpy = jest.spyOn(Taro, 'getStorageSync')
  const getStorageSpy = jest.spyOn(Taro, 'getStorage')
  const setStorageSyncSpy = jest.spyOn(Taro, 'setStorageSync')
  const setStorageSpy = jest.spyOn(Taro, 'setStorage')
  const removeStorageSyncSpy = jest.spyOn(Taro, 'removeStorageSync')
  const removeStorageSpy = jest.spyOn(Taro, 'removeStorage')

  beforeEach(() => {
    getStorageSyncSpy.mockImplementation(jest.fn().mockReturnValue(value))
    getStorageSpy.mockImplementation(jest.fn().mockResolvedValue({ data: value }))
    setStorageSyncSpy.mockImplementation(jest.fn())
    setStorageSpy.mockImplementation(jest.fn().mockResolvedValue(undefined))
    removeStorageSyncSpy.mockImplementation(jest.fn())
    removeStorageSpy.mockImplementation(jest.fn().mockResolvedValue(undefined))
  })

  it('should getStorageSync did work', () => {
    expect(getStorageSync(key)).toBe(value)
    expect(getStorageSyncSpy).toHaveBeenCalledWith(key)
  })

  it('should getStorage did work', async () => {
    expect(await getStorage(key)).toBe(value)
    expect(getStorageSpy).toHaveBeenCalledWith({ key })
  })

  it('should setStorageSync did work', () => {
    setStorageSync(key, value)
    expect(setStorageSyncSpy).toHaveBeenCalledWith(key, value)
  })

  it('should setStorage did work', async () => {
    await setStorage(key, value)
    expect(setStorageSpy).toHaveBeenCalledWith({ key, data: value })
  })

  it('should removeStorageSync did work', () => {
    removeStorageSync(key)
    expect(removeStorageSyncSpy).toHaveBeenCalledWith(key)
  })

  it('should removeStorage did work', async () => {
    await removeStorage(key)
    expect(removeStorageSpy).toHaveBeenCalledWith({ key })
  })
})
