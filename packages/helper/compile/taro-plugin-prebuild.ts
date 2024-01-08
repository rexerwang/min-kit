import { resolve } from 'node:path'

import { logger, writeJson } from './shared'
import { IPluginOptions } from './types'

import type { IPluginContext } from '@tarojs/service'

function PrebuildPlugin(ctx: IPluginContext, { config }: IPluginOptions<any[]>) {
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
