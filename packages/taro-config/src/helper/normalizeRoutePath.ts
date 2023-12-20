export function normalizeRoutePath<T extends object>(routeMap: T) {
  return Object.entries(routeMap).reduce((map, [key, route]) => {
    if (!/^[A-Za-z0-9]+$/.test(key)) throw new Error(`Only letters or numbers are allowed: ${key}`)

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
