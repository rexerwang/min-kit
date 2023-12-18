import { getTag } from './object'

export const isString = (value: unknown): value is string => typeof value === 'string'
export const isNumber = (value: unknown): value is number => typeof value === 'number' && !Number.isNaN(value)
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
export const isFunction = (value: unknown): value is (...x: any[]) => any => typeof value === 'function'
export const isError = (value: unknown): value is Error => getTag(value) === '[object Error]'

// fork: https://github.com/lodash/lodash/blob/main/src/isPlainObject.ts#L30
export function isPlainObject(value: unknown): value is Record<any, any> {
  if (getTag(value) !== '[object Object]') {
    return false
  }
  if (Object.getPrototypeOf(value) === null) {
    return true
  }

  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(value) === proto
}

/**
 * Checks if value is null/undefined, empty string, object, array, map or set.
 */
export function isEmpty(value: any) {
  if (value == null) return true
  if (isString(value)) return !value
  if (isBoolean(value) || isNumber(value)) return false

  if (Array.isArray(value)) return !value.length

  const tag = getTag(value)
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !value.size
  }

  if (isPlainObject(value)) return !Object.keys(value).length

  return true
}
