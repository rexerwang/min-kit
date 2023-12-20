import merge from 'webpack-merge'

import { argv } from '../shared'
import { UserConfigService } from './UserConfigService'

import type { UserConfigExport, UserConfigFn } from '@tarojs/cli'

export async function defineUserConfig(fn: UserConfigFn) {
  const configService = new UserConfigService(argv.mode, process.env.TARO_ENV)
  configService.start()

  const userConfig: UserConfigExport = {
    plugins: [
      [require.resolve('@miniapp/taro-config/plugin-prebuild'), { config: configService.project }],
      ['@tarojs/plugin-mini-ci', configService.ci],
    ],
    defineConstants: configService.defineConstants,
  }

  const baseConfig = await fn(merge as any, { command: argv._, mode: argv.mode })

  return merge({}, baseConfig, userConfig)
}
