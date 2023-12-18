import { attempt } from '@miniapp/shared'
import {
  getStorage as getStorageApi,
  getStorageSync as getStorageSyncApi,
  removeStorage as removeStorageApi,
  removeStorageSync as removeStorageSyncApi,
  setStorage as setStorageApi,
  setStorageSync as setStorageSyncApi,
} from '@tarojs/taro'

export function getStorageSync<T = unknown>(key: string) {
  return attempt(() => getStorageSyncApi<T>(key))
}

export async function getStorage<T = unknown>(key: string) {
  const res = await attempt.async(() => getStorageApi<T>({ key }))
  return res?.data
}

export function setStorageSync(key: string, data: any) {
  attempt(() => setStorageSyncApi(key, data))
}

export async function setStorage(key: string, data: any) {
  await attempt.async(() => setStorageApi({ key, data }))
}

export function removeStorageSync(key: string) {
  attempt(() => removeStorageSyncApi(key))
}

export async function removeStorage(key: string) {
  await attempt.async(() => removeStorageApi({ key }))
}
