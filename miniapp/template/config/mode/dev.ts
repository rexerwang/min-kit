import type { UserConfig } from '@min-kit/helper/compile'

export default {
  appid: {
    weapp: 'your-weapp-appid',
    tt: 'your-tt-appid',
  },
  defineConstants: {
    baseUrl: 'https://httpbin.org',
  },
} satisfies UserConfig.ModeConfig
