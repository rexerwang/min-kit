import ConfigChain from './ConfigChain'

import type { Config } from '@tarojs/taro'

type ConfigEnv = {
  mode: Mode
  env: NodeJS.ProcessEnv['NODE_ENV']
}

/**
 * defineAppConfig by {@link ConfigChain}
 *
 * @requires `process.env.TARO_MODE`
 * @requires `process.env.NODE_ENV`
 */
export function configChain(cb: (chain: ConfigChain, env: ConfigEnv) => void): Config {
  const chain = new ConfigChain()
  cb(chain, { mode: process.env.TARO_MODE, env: process.env.NODE_ENV })
  return chain.get() as Config
}
