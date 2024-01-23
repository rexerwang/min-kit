import { Current } from '@tarojs/taro'

type CurrentInstance = typeof Current
interface CurrentType extends CurrentInstance {
  app: CurrentInstance['app'] & { config?: Taro.AppConfig }
  page: CurrentInstance['page'] & { $taroPath?: string }
}

export default Current as CurrentType
