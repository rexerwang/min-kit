import { RootPortal, View } from '@tarojs/components'
import { canIUse } from '@tarojs/taro'

// TODO: fix RootPortal not defined in some platforms (tt, ...)
export default canIUse('root-portal') ? RootPortal : View
