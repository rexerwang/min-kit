import { resolve } from 'node:path'

import { logger, writeJson } from './taro/shared'

import type { IPluginContext } from '@tarojs/service'

interface IPluginOptions {
  config: any[]
}

function PrebuildPlugin(ctx: IPluginContext, { config }: IPluginOptions) {
  ctx.registerCommand({
    name: 'prebuild',
    async fn() {
      try {
        await Promise.all(
          config.map(({ output, ...projectConfig }) =>
            writeJson(resolve(output), projectConfig).then(() => logger.generate(output)),
          ),
        )
      } catch (error: any) {
        logger.error(error)
      }
    },
  })
}

export default PrebuildPlugin
