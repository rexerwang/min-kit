import { attempt } from '@miniapp/shared'
import { getMenuButtonBoundingClientRect, getSystemInfoSync } from '@tarojs/taro'

import { logger } from './logger'

/** Make the properties of T whose keys are in K required */
type RequiredWith<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

interface ISystemInfo
  extends RequiredWith<Taro.getSystemInfoSync.Result, 'statusBarHeight' | 'SDKVersion' | 'version' | 'safeArea'> {
  /** 右上角胶囊按的布局位置信息 */
  menuButtonRect: Taro.getMenuButtonBoundingClientRect.Rect
  isiPad: boolean
  isiOS: boolean
  isiPhoneX: boolean
  isAndroid: boolean
  isDevtools: boolean
}

export const SystemInfo: ISystemInfo = {
  menuButtonRect: {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  },
  safeArea: {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  },
  isiPad: false,
  isiOS: false,
  isiPhoneX: false,
  isAndroid: false,
  isDevtools: false,
  brand: '',
  model: '',
  pixelRatio: 0,
  screenWidth: 0,
  screenHeight: 0,
  windowWidth: 0,
  windowHeight: 0,
  language: '',
  system: '',
  platform: '',
  benchmarkLevel: 0,
  statusBarHeight: 0,
  SDKVersion: '',
  version: '',
}

export function getSystemInfo() {
  try {
    const systemInfo = getSystemInfoSync()
    if (!systemInfo) throw new Error('getSystemInfoSync is nil')

    const { system, model, platform } = systemInfo
    const isAndroid = /Android/i.test(system)
    const isiOS = /iOS/i.test(system)
    const isiPhoneX = isiOS && /^iPhone (X|\d{2})/i.test(model)
    const isiPad = /iPad/i.test(model)
    const isDevtools = platform === 'devtools'

    Object.assign(SystemInfo, systemInfo, {
      isAndroid,
      isiPad,
      isiOS,
      isiPhoneX,
      isDevtools,
    })
  } catch (error) {
    logger.error('#SystemInfo', error)
  }

  const menuButtonRect = attempt(getMenuButtonBoundingClientRect)
  if (menuButtonRect) Object.assign(SystemInfo, { menuButtonRect })

  logger.debug('#SystemInfo', SystemInfo)
  return SystemInfo
}

// initialize SystemInfo
getSystemInfo()
