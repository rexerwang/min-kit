import { isString } from './is'
import { qs } from './qs'

/** @see https://en.wikipedia.org/wiki/UTM_parameters */
export interface OriginUTM {
  /** 广告活动来源 */
  utm_source?: string
  /** 广告活动媒介 */
  utm_medium?: string
  /** 广告活动名称 */
  utm_campaign?: string
  /** 广告活动内容 */
  utm_content?: string
  /** 广告活动关键词  */
  utm_term?: string
}

/** shorten UTM (GA style) */
export interface ShortUTM {
  /** 广告活动来源 utm_source */
  cs?: string
  /** 广告活动媒介 utm_medium */
  cm?: string
  /** 广告活动名称 utm_campaign */
  cn?: string
  /** 广告活动内容 utm_content */
  cc?: string
  /** 广告活动关键词 utm_term */
  ck?: string
}

export interface UTMObject {
  /** 广告活动来源 utm_source cs */
  source?: string
  /** 广告活动媒介 utm_medium cm */
  medium?: string
  /** 广告活动名称 utm_campaign cn */
  campaign?: string
  /** 广告活动内容 utm_content cc */
  content?: string
  /** 广告活动关键词 utm_term ck */
  keyword?: string
}

const Sources = {
  /** 订阅消息 */
  subscription: { source: 'subscription' } satisfies UTMObject,
  /** 分享好友 */
  shareFriends: { source: 'share', medium: 'friends' } satisfies UTMObject,
  /** 分享朋友圈 */
  shareTimeline: { source: 'share', medium: 'timeline' } satisfies UTMObject,
  /** 普通二维码 */
  qrcode: { source: 'qr', medium: 'qr' } satisfies UTMObject,
  /** 小程序码 */
  wxacode: { source: 'qr', medium: 'wxa' } satisfies UTMObject,
}

const mapping: [keyof UTMObject, keyof OriginUTM, keyof ShortUTM][] = [
  ['source', 'utm_source', 'cs'],
  ['medium', 'utm_medium', 'cm'],
  ['campaign', 'utm_campaign', 'cn'],
  ['content', 'utm_content', 'cc'],
  ['keyword', 'utm_term', 'ck'],
]

function parse(params: Record<string, any>) {
  const utm: UTMObject = {}

  mapping.forEach(([field, ...keys]) => {
    for (const k of keys) {
      const v = params[k]
      if (v && isString(v)) {
        utm[field] = v
        break
      }
    }
  })

  return utm
}

function generate<T extends UTMObject>(utm: T, shorten?: false): Omit<T, keyof UTMObject> & OriginUTM
function generate<T extends UTMObject>(utm: T, shorten: true): Omit<T, keyof UTMObject> & ShortUTM
function generate<T extends UTMObject>(utm: T, shorten = true) {
  return Object.entries(utm).reduce((params, [target, value]) => {
    const [, key, k] = mapping.find(([field]) => field === target) ?? []
    const field = shorten ? k : key
    if (isString(value) && field) params[field] = value
    else params[target] = value
    return params
  }, {})
}

function stringify<T extends UTMObject>(utm: T, shorten = true) {
  return qs.stringify(generate(utm, shorten as any))
}

function from(source: UTMObject, target: Record<string, any>) {
  for (const field of Object.keys(source)) {
    if (source[field] !== target[field]) return false
  }
  return true
}

export const UTM = { Sources, parse, generate, stringify, from }
