import { getStorage, removeStorage, setStorage } from '@tarojs/taro'

import type { StateStorage } from 'zustand/middleware'

export class StateStorageImpl implements StateStorage {
  async getItem(key: string) {
    const { data } = await getStorage({ key })
    return data
  }

  async setItem(key: string, data: string) {
    await setStorage({ key, data })
  }

  async removeItem(key: string) {
    await removeStorage({ key })
  }
}
