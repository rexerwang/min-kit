import Taro from '@tarojs/taro'

import { StateStorageImpl } from '../StateStorageImpl'

const getStorageSpy = jest.spyOn(Taro, 'getStorage').mockImplementation(jest.fn().mockResolvedValue({}))
const removeStorageSpy = jest.spyOn(Taro, 'removeStorage').mockImplementation(jest.fn().mockResolvedValue({}))
const setStorageSpy = jest.spyOn(Taro, 'setStorage').mockImplementation(jest.fn().mockResolvedValue({}))

describe('StateStorageImpl', () => {
  it('should invoke storage apis', async () => {
    const StateStorage = new StateStorageImpl()

    StateStorage.getItem('k')
    expect(getStorageSpy).toHaveBeenCalledWith({ key: 'k' })

    StateStorage.setItem('k', 'v')
    expect(setStorageSpy).toHaveBeenCalledWith({ key: 'k', data: 'v' })

    StateStorage.removeItem('k')
    expect(removeStorageSpy).toHaveBeenCalledWith({ key: 'k' })
  })
})
