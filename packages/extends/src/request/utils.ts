export function joinUrl(url: string, baseUrl?: string) {
  if (!baseUrl || url.indexOf('://') > -1) return url

  return baseUrl.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '')
}

export function cloneObj<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  return Object.keys(obj).reduce(
    (acc, key) => {
      if (!keys.includes(key as any)) {
        acc[key] = obj[key]
      }

      return acc
    },
    {} as Omit<T, K>,
  )
}
