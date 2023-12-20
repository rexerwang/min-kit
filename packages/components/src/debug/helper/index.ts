import { attempt } from '@miniapp/shared'

export function prettyJSON(data?: any) {
  if (data == null || typeof data === 'string') return data
  return attempt(() => JSON.stringify(data, null, 2))
}

export function timing(ms: number) {
  const toFixed = (v: any) => Number(v.toFixed(2))
  return ms < 1000 ? ms + 'ms' : ms < 60000 ? toFixed(ms / 1000) + 's' : toFixed(ms / 60000) + 'm'
}
