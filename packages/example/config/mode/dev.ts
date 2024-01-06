import type { UserConfig } from '@min-kit/helper/compile'

export default {
  appid: {
    weapp: process.env.TARO_APP_ID || 'your-weapp-appid', // from dotenv or set the weapp appid
    tt: process.env.TARO_APP_ID || 'your-tt-appid',
    alipay: process.env.TARO_APP_ID || 'your-alipay-appid',
  },
  defineConstants: {
    baseUrl: 'https://httpbin.org',
  },
} satisfies UserConfig.ModeConfig
