import { offAppHide, onAppHide } from '@tarojs/taro'

import { createEventListener } from './createEventListener'

/** delegate `onAppHide` */
export const useAppHide = createEventListener<Taro.onAppShow.CallbackResult>('onAppHide', {
  on: (_, cb) => onAppHide(cb),
  off: (_, cb) => offAppHide(cb),
})
