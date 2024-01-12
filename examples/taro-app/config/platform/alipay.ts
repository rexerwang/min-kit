import type { UserConfig } from '@min-kit/helper/taro'

/** 支付宝小程序配置 */
export default ((appid) => ({
  project: {
    output: 'mini.project.json',
    compileType: 'mini',
    miniprogramRoot: 'dist',
  },
  ci: {
    appid,
    toolId: 'your-toolId',
    privateKeyPath: 'your-privateKeyPath',
  },
})) satisfies UserConfig.PlatformConfigFn
