import type { UserConfig } from '@min-kit/helper/compile'

export default {
  appid: {
    weapp: process.env.TARO_APP_ID || 'your-weapp-appid', // from dotenv or set the weapp appid
    tt: 'testAppId',
    alipay: 'testAppId',
  },
  defineConstants: {
    baseUrl: 'https://httpbin.org',
  },
} satisfies UserConfig.ModeConfig
