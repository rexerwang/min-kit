import Taro, { useDidShow } from '@tarojs/taro'

interface LaunchOptions extends Taro.getLaunchOptionsSync.LaunchOptions {
  query: {
    scancode_time: string
    [x: string]: any
  }
}

/**
 * 扫码启动时回调
 *
 * by `query.scancode_time`
 * @supported weapp
 */
export function useDidScan(cb: (options: LaunchOptions) => void) {
  useDidShow((options) => {
    const query = options?.query
    query?.q && query?.scancode_time && cb(options as LaunchOptions)
  })
}
