import type { UserConfigFn as TaroUserConfigFn } from '@tarojs/cli'
import type {
  AlipayConfig,
  CIOptions,
  JdConfig,
  SwanConfig,
  TTConfig,
  WeappConfig,
} from '@tarojs/plugin-mini-ci/types/BaseCi'
import type { IProjectConfig } from '@tarojs/taro/types/compile'

type AnyObject = Record<string, any>

type UserConfigFn = (...args: Parameters<TaroUserConfigFn>) => IProjectConfig

namespace UserConfig {
  /** 目标环境 */
  export type Mode = 'dev' | 'prod'

  export interface ModeConfig {
    appid: Record<string, string>
    defineConstants: DefineConstants
  }

  export interface PlatformConfig {
    project: AnyObject[] | AnyObject
    ci?: WeappConfig | TTConfig | AlipayConfig | JdConfig | SwanConfig
  }

  export type PlatformConfigFn = (appid: string, mode: Mode) => PlatformConfig

  export interface ConfigExport {
    appid: string
    defineConstants: { G: string }
    project: AnyObject[]
    ci: CIOptions
  }
}

export type { AnyObject, IProjectConfig, UserConfig, UserConfigFn }
