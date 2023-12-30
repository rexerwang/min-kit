import type { UserConfigExport } from '@tarojs/cli'

export default {
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false, // 使用 weapp-tailwindcss 时建议关闭
    },
  },
  mini: {},
  h5: {},
} satisfies UserConfigExport
