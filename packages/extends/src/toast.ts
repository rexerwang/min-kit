import { hideLoading, hideToast, showLoading, showToast } from '@tarojs/taro'

import { logger } from './logger'

type ToastOption = Partial<Pick<Taro.showToast.Option, 'duration' | 'icon' | 'image' | 'mask'>>

interface Toast {
  (title: string, option?: ToastOption): Promise<void>

  /**
   * Toast 成功提示
   *
   * @param title 提示内容：默认`'操作成功'`，最多显示7个汉字长度
   *
   * @example 异步调用，如：
   * ```ts
   * // 提示成功后返回上一页
   * toast.success().then(() => goBack())
   * ```
   */
  success(title?: string, option?: Omit<ToastOption, 'icon'>): Promise<void>
  /**
   * Toast 错误提示
   *
   * @param title 提示内容：默认`'操作失败'`，最多显示7个汉字长度
   *
   * @example 异步调用，如：
   * ```ts
   * // 提示成功后返回上一页
   * toast.error().then(() => goBack())
   * ```
   */
  error(title?: string, option?: Omit<ToastOption, 'icon'>): Promise<void>
  /**
   * Toast loading提示
   *
   * @param title 提示内容：默认`'加载中...'`，最多显示7个汉字长度
   * @param mask 是否显示透明蒙层，防止触摸穿透。默认`true`
   *
   * @example 异步调用，如：
   * ```ts
   * // 1. 请求loading处理
   * toast.loading()
   *  .then(() => requestApi())
   *  .then(() => toast.success()) // 自动关闭前一个toast
   *  .catch(() => toast('操作失败')) // 自动关闭前一个toast
   *
   * // 2. 自行关闭loading
   * await toast.loading()
   * // ...do something..
   * toast.clear()
   * ```
   */
  loading(title?: string, mask?: boolean): Promise<void>
  /**
   * 关闭所有活跃Toast
   *
   * @example 若有后续操作，异步调用，如：
   * ```ts
   * toast.clear().then(() => goBack())
   * ```
   */
  clear(): Promise<void>
}

let current: 'loading' | 'toast' | null = null

const warn = (msg: any) => {
  logger.warn('#toast', msg)
}

const delay = {
  timers: [] as NodeJS.Timeout[],
  start: (ms: number) =>
    new Promise<void>((resolve) => {
      delay.timers.push(setTimeout(resolve, ms))
    }),
  clear: () => {
    delay.timers.splice(0).forEach((id) => clearTimeout(id))
  },
}

export const toast: Toast = (title, option) =>
  toast
    .clear()
    .then(() => showToast({ title, icon: 'none', duration: 1500, ...option }))
    .then(() => {
      current = 'toast'
    })
    .then(() => delay.start(option?.duration || 1500))
    .then(() => {
      delay.clear()
      current = null
    })
    .catch(warn)

toast.success = (title = '操作成功', option) => toast(title, { ...option, icon: 'success' })

toast.error = (title = '操作失败', option) => toast(title, { ...option, icon: 'error' })

toast.loading = (title = '加载中...', mask = true) =>
  toast
    .clear()
    .then(() => showLoading({ title, mask }))
    .then(() => {
      current = 'loading'
    })
    .catch(warn)

toast.clear = () => {
  if (!current) return Promise.resolve()

  const isToast = current === 'toast'

  return Promise.race([isToast ? hideToast() : hideLoading(), delay.start(200)])
    .then(() => {
      delay.clear()
      current = null
    })
    .catch(warn)
}
