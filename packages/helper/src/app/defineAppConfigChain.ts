import ConfigChain from './chain/ConfigChain'

type ConfigEnv = {
  mode: NodeJS.ProcessEnv['TARO_MODE']
  env: NodeJS.ProcessEnv['NODE_ENV']
}

/**
 * defineAppConfig by {@link ConfigChain}
 *
 * @requires `process.env.TARO_MODE`
 * @requires `process.env.NODE_ENV`
 */
export function defineAppConfigChain(cb: (chain: ConfigChain, env: ConfigEnv) => void): Taro.Config {
  const chain = new ConfigChain()
  cb(chain, { mode: process.env.TARO_MODE, env: process.env.NODE_ENV })
  return chain.get()
}
