import { Route } from '@min-kit/shared'

import Current from './current'

/** Determine whether the current page has the native NavigationBar */
export function hasNavBar() {
  const navigationStyle = Current.page?.config?.navigationStyle ?? Current.app.config?.window?.navigationStyle
  return navigationStyle !== 'custom'
}

/**
 * Determine whether the page has the native TabBar
 *
 * @param path current as default
 */
export function hasTabBar(path?: string) {
  if (path === undefined) path = Current.router?.path
  if (!path) return false

  const tabBar = Current.app.config?.tabBar
  if (!tabBar) return false

  return tabBar.list.findIndex((i) => Route.equals(i.pagePath, path!)) > -1
}
