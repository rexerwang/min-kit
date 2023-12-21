import { resolve } from 'node:path'

import { logger } from './shared'

import type { AnyObject, UserConfig } from './types'

export class UserConfigService {
  readonly MODE_CONFIG_PATH = 'config/mode'
  readonly PLATFORM_CONFIG_PATH = 'config/platform'
  private userConfig = {} as UserConfig.ConfigExport

  constructor(
    private mode: UserConfig.Mode,
    private platform: string = 'weapp',
  ) {}

  get appid() {
    return this.userConfig.appid
  }
  get defineConstants() {
    return this.userConfig.defineConstants
  }
  get ci() {
    return this.userConfig.ci
  }
  get project() {
    return this.userConfig.project
  }

  private loadModeConfig() {
    const config: UserConfig.ModeConfig = require(resolve(this.MODE_CONFIG_PATH, this.mode)).default

    const appid = config.appid[this.platform]
    if (!appid) throw new Error(`Cannot find appid of ${this.platform} in ${this.mode}`)

    return { appid, defineConstants: { G: JSON.stringify(config.defineConstants) } }
  }

  private loadPlatformConfig(appid: string) {
    const configFn: UserConfig.PlatformConfigFn = require(resolve(this.PLATFORM_CONFIG_PATH, this.platform)).default
    return configFn(appid, this.mode)
  }

  private getCIMeta() {
    const version = process.env.CI_MINI_VERSION || this.mode
    const desc = process.env.CI_MINI_DESC

    return { version, desc }
  }

  start() {
    logger.exec(`加载${this.mode}环境配置`)
    const { appid, defineConstants } = this.loadModeConfig()
    const { project, ci } = this.loadPlatformConfig(appid)

    this.userConfig = {
      appid,
      defineConstants,
      project: ([] as AnyObject[]).concat(project),
      ci: {
        ...this.getCIMeta(),
        [this.platform]: ci,
      },
    }
  }
}
