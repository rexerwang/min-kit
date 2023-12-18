import { Current } from '@tarojs/taro'

type CurrentInstance = typeof Current
interface CurrentType extends CurrentInstance {
  app: Taro.AppInstance & { config?: Taro.AppConfig }
  page: Taro.PageInstance & { $taroPath?: string }
}

export default Current as CurrentType
