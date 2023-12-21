import ConfigChain from './ConfigChain'

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
export function configChain(cb: (chain: ConfigChain, env: ConfigEnv) => void) {
  const chain = new ConfigChain()
  cb(chain, { mode: process.env.TARO_MODE as Mode, env: process.env.NODE_ENV })
  return chain.get()
}
