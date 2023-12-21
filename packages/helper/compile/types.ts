import type {
  AlipayConfig,
  CIOptions,
  JdConfig,
  SwanConfig,
  TTConfig,
  WeappConfig,
} from '@tarojs/plugin-mini-ci/types/BaseCi'

export type AnyObject = Record<string, any>

export namespace TaroCLI {
  export type argv = {
    /** 目标环境 */
    mode: Mode
    /** 启用analyzer */
    analyzer: boolean
    /** command */
    command: string
  } & Record<string, string>
}

export type IPluginOptions<T = any> = { config: T }

export namespace UserConfig {
  /** 目标环境 */
  export type Mode = 'dev' | 'prod'

  export interface ModeConfig {
    appid: Record<string, string>
    defineConstants: DefineConstants
  }

  export interface PlatformConfig {
    project: AnyObject[] | AnyObject
    ci: WeappConfig | TTConfig | AlipayConfig | JdConfig | SwanConfig
  }

  export type PlatformConfigFn = (appid: string, mode: Mode) => PlatformConfig

  export interface ConfigExport {
    appid: string
    defineConstants: { G: string }
    project: AnyObject[]
    ci: CIOptions
  }
}
