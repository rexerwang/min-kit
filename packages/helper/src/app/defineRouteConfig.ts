function normalizeRoutePath<T extends object>(routeMap: T) {
  return Object.entries(routeMap).reduce((map, [key, route]) => {
    if (!/^[A-Za-z0-9]+$/.test(key))
      throw new Error(`Only letters or numbers are allowed as the subPackage key: ${key}`)

    if (typeof route === 'string') {
      map[key] = '/' + route
    } else {
      const pkg = key
        .split('')
        .map((c, i) => (i === 0 || /[a-z0-9]/.test(c) ? c : '-' + c))
        .join('')
        .toLowerCase()

      const root = `/${pkg}/`

      map[key] = Object.entries(route).reduce((pages, [k, path]) => {
        pages[k] = root + path
        return pages
      }, {})
    }

    return map
  }, {} as T)
}

type RouteRecord = Record<string, string | Record<string, string>>

type RouteConfig<T> = {
  /** the **relative** path routes */
  Routes: T
  /** the **absolute** path routes */
  Pages: T
}

/**
 * Define route paths. with the nested subPackages (optional)
 *
 * @param Routes the relative path routes.
 * If there are subPackages, use the subPackage root (PascalCase) as the key.
 *
 * @example
 * ```js
 * defineRouteConfig({
 *   // main package
 *   Home: 'pages/index/index',
 *
 *   // pkg-abc subPackage
 *   PkgAbc: {
 *     Home: 'pages/index/index',
 *   }
 * })
 * ```
 */
export function defineRouteConfig<T extends RouteRecord>(Routes: T): RouteConfig<T> {
  return { Routes, Pages: normalizeRoutePath(Routes) }
}
