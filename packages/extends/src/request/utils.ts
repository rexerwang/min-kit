export function joinUrl(url: string, baseUrl?: string) {
  if (!baseUrl || url.indexOf('://') > -1) return url

  return baseUrl.replace(/\/+$/, '') + '/' + url.replace(/^\/+/, '')
}

export function cloneObj<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T
}
