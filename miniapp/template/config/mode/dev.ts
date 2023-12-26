import type { UserConfig } from '@min-kit/helper/compile'

export default {
  appid: {
    weapp: process.env.TARO_APP_ID, // from dotenv or set the weapp appid
    tt: 'your-tt-appid',
  },
  defineConstants: {
    baseUrl: 'https://httpbin.org',
  },
} satisfies UserConfig.ModeConfig
