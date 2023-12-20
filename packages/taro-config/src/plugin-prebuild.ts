import { resolve } from 'node:path'

import { logger, writeJson } from './shared'

import type { TaroPlugin } from './types'

function PrebuildPlugin(ctx: TaroPlugin.IPluginContext, { config }: TaroPlugin.IPluginOptions<any[]>) {
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
