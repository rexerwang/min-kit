import { isString } from './is'
import { qs } from './qs'

export namespace Route {
  export type Query = Record<string, any> | string | null | undefined
  export type GenerateOptions = qs.StringifyOptions
}

export class Route {
  private constructor() {}

  /** ensure route starts with '/' */
  static ensure(path: string) {
    return path.startsWith('/') ? path : '/' + path
  }

  static generate(path: string, query?: Route.Query, options?: Route.GenerateOptions) {
    const route = Route.ensure(path)

    if (query) {
      if (isString(query)) return route + (route.includes('?') ? '&' : '?') + query
      return qs.stringifyUrl({ url: route, query }, options)
    }

    return route
  }

  /** parse route into path & query-string */
  static parse(route: string) {
    const parsed = qs.parseUrl(route)
    return { path: Route.ensure(parsed.url), query: parsed.query }
  }

  /** extract path from route */
  static extract(route: string) {
    return Route.ensure(route.split('?')[0])
  }

  static equals(route1: string, route2: string) {
    return Route.extract(route1) === Route.extract(route2)
  }

  /**
   * determine nested route
   *
   * - ❌ be equals
   * - ✅ `pages/a/index` -> `pages/a/b/index`
   * - ✅ `pages/a/b` -> `pages/a/b/c/index`
   *
   * when NOT strict:
   * - ✅ `pages/index/index` -> `pages/a/index`
   * - ✅ `pages/index/index` -> `pages/a/b/c`
   */
  static includes(route: string, subRoute: string, strict?: boolean) {
    if (this.equals(route, subRoute)) return false

    const extract = (path: string) => {
      const _path = Route.extract(path)
      return _path.endsWith('/') ? _path : _path + '/'
    }

    const parent = strict ? extract(route).replace(/index\/$/, '') : extract(route).replace(/index\//g, '')
    return extract(subRoute).includes(parent)
  }
}
