import { offAppShow, onAppShow } from '@tarojs/taro'

import { createEventListener } from './createEventListener'

/** delegate `onAppShow` */
export const useAppShow = createEventListener<Taro.onAppShow.CallbackResult>('onAppHide', {
  on: (_, cb) => onAppShow(cb),
  off: (_, cb) => offAppShow(cb),
})
