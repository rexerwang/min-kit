import { attempt } from '@min-kit/shared'
import { getEnterOptionsSync } from '@tarojs/taro'

/** @see https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html */
const enum Scene {
  SINGLE_CHAT = 1007,
  GROUP_CHAT = 1008,
  QRCODE_SCAN = 1011,
  QRCODE_LONG_PRESS = 1012,
  QRCODE_SCAN_FROM_ALBUM = 1013,
  SUBSCRIPTION = 1014,
  SUBSCRIPTION2 = 1107,
  TIMELINE_TO_SINGLE_PAGE = 1154,
  FROM_SINGLE_PAGE_MODE = 1155,
}

export const scene = {
  get current() {
    return attempt(getEnterOptionsSync)?.scene ?? 0
  },
  get isSinglePageMode() {
    return scene.current === Scene.TIMELINE_TO_SINGLE_PAGE
  },
  get isFromSubscription() {
    return [Scene.SUBSCRIPTION, Scene.SUBSCRIPTION2].includes(scene.current)
  },
  get isFromShare() {
    return [Scene.SINGLE_CHAT, Scene.GROUP_CHAT, Scene.FROM_SINGLE_PAGE_MODE].includes(scene.current)
  },
  get isFromQrcode() {
    return [Scene.QRCODE_LONG_PRESS, Scene.QRCODE_SCAN, Scene.QRCODE_SCAN_FROM_ALBUM].includes(scene.current)
  },
}
