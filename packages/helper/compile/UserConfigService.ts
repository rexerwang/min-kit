import { resolve } from 'node:path'

import { logger, requires } from './shared'

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
    const config: UserConfig.ModeConfig = requires(resolve(this.MODE_CONFIG_PATH, this.mode))

    const appid = config.appid[this.platform]
    if (!appid) throw new Error(`Cannot find appid of ${this.platform} in ${this.mode}`)

    return { appid, defineConstants: { G: JSON.stringify(config.defineConstants) } }
  }

  private loadPlatformConfig(appid: string) {
    const configFn: UserConfig.PlatformConfigFn = requires(resolve(this.PLATFORM_CONFIG_PATH, this.platform))
    return configFn(appid, this.mode)
  }

  private getCIMeta() {
    const version = process.env.CI_MINI_VERSION || this.mode
    const desc = process.env.CI_MINI_DESC

    return { version, desc }
  }

  start() {
    logger.exec(`${this.mode} mode`)
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
