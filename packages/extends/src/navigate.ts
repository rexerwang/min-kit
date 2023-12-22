import { Route } from '@min-kit/shared'
import { navigateBack, navigateTo, navigateToMiniProgram, redirectTo, reLaunch, switchTab } from '@tarojs/taro'

import { hasTabBar } from './config'
import { logger } from './logger'

type GoToOptions = {
  redirect?: boolean
  reLaunch?: boolean
  generate?: Route.GenerateOptions
}

export function go(path: string, query?: Route.Query, options: GoToOptions = {}) {
  const url = Route.generate(path, query, options.generate)

  if (options.reLaunch) return reLaunch({ url })
  if (hasTabBar(path)) return switchTab({ url: Route.extract(path) })
  if (options.redirect) return redirectTo({ url })
  return navigateTo({ url })
}

go.redirect = (path: string, query?: Route.Query, options?: Route.GenerateOptions) =>
  go(path, query, { redirect: true, generate: options })

go.reLaunch = (path: string, query?: Route.Query, options?: Route.GenerateOptions) =>
  go(path, query, { reLaunch: true, generate: options })

go.back = (fallbackPath?: string) =>
  navigateBack().catch((e) => {
    if (e.errMsg?.includes('at first') && fallbackPath) {
      logger.warn('#go.back', 'fallback to ' + fallbackPath, 'when', e.errMsg)
      return go.redirect(fallbackPath)
    }
    throw e
  })

go.miniProgram = (option: Taro.navigateToMiniProgram.Option) => {
  logger.debug('#go.miniProgram', option)
  return navigateToMiniProgram(option)
}
