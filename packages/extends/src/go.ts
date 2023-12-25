import { Route } from '@min-kit/shared'
import { navigateBack, navigateTo, navigateToMiniProgram, redirectTo, reLaunch, switchTab } from '@tarojs/taro'

import { hasTabBar } from './config'
import { logger } from './logger'

type GoOptions = {
  redirect?: boolean
  reLaunch?: boolean
  generate?: Route.GenerateOptions
}
type GoRes = Promise<TaroGeneral.CallbackResult>
type GoFn = (path: string, query?: Route.Query, options?: GoOptions) => GoRes
interface Go extends GoFn {
  redirect(path: string, query?: Route.Query, options?: GoOptions['generate']): GoRes
  reLaunch(path: string, query?: Route.Query, options?: GoOptions['generate']): GoRes
  back(fallbackPath?: string): GoRes
  miniProgram(option: Taro.navigateToMiniProgram.Option): GoRes
}

export const go: Go = (path, query?, options = {}) => {
  const url = Route.generate(path, query, options.generate)

  if (options.reLaunch) return reLaunch({ url })
  if (hasTabBar(path)) return switchTab({ url: Route.extract(path) })
  if (options.redirect) return redirectTo({ url })
  return navigateTo({ url })
}

go.redirect = (path, query, options) => go(path, query, { redirect: true, generate: options })

go.reLaunch = (path, query, options) => go(path, query, { reLaunch: true, generate: options })

go.back = (fallbackPath) =>
  navigateBack().catch((e) => {
    if (e.errMsg?.includes('at first') && fallbackPath) {
      logger.warn('#go.back', 'fallback to ' + fallbackPath, 'when', e.errMsg)
      return go.redirect(fallbackPath)
    }
    throw e
  })

go.miniProgram = (option) => {
  logger.debug('#go.miniProgram', option)
  return navigateToMiniProgram(option)
}
