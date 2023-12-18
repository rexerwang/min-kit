import { debounce } from './debounce'

type Option = {
  leading?: boolean
  trailing?: boolean
}

/**
 * @see https://lodash.com/docs/4.17.15#throttle
 *
 * Fork from {@link https://github.com/lodash/lodash/blob/4.17.21-es/throttle.js}
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 0,
  options: Option = { leading: true, trailing: true },
) {
  let leading = true
  let trailing = true

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  if (options) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  })
}
