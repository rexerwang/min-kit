/* eslint no-console: 0 */
import { attempt, isFunction, isString, Route } from '@min-kit/shared'
import { canIUse, Current, getLogManager, getRealtimeLogManager, getSystemInfoSync } from '@tarojs/taro'

import { RequestError } from '../request/RequestError'

type LogLevel = 'error' | 'warn' | 'info' | 'debug'
type Meta = { route?: string; timestamp: number }

export interface LoggerOption {
  reporter?: {
    /**
     * realtime reporter by {@link Taro.RealtimeLogManager}.
     *
     * @default true
     * @notice disabled in Devtools
     * @supported weapp
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/RealtimeLogManager.html
     */
    realtime?: boolean
    /**
     * feedback reporter by {@link Taro.LogManager}
     * @default false
     * @notice disabled in Devtools
     * @supported weapp
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/base/debug/LogManager.html
     */
    feedback?: boolean
    /**
     * custom reporter
     */
    custom?(log: { level: LogLevel; filters: string[]; msgs: any[]; meta: Meta }): any
  }

  /**
   * show timestamp
   * @default true
   * @notice disabled in Devtools
   */
  timestamp?: boolean
  /** append meta info when report */
  meta?: boolean
}

const isDevtools = attempt(getSystemInfoSync)?.platform === 'devtools'

export class Logger {
  private name: string
  private option: LoggerOption = {
    reporter: {
      realtime: true,
      feedback: true,
    },
    timestamp: true,
    meta: true,
  }

  private feedbackReporter: Taro.LogManager | undefined
  private realtimeReporter: Taro.RealtimeLogManager | undefined

  constructor(name: string, option = {} as LoggerOption) {
    this.name = name
    this.setOption(option)
  }

  setOption(option: LoggerOption) {
    this.option = Object.assign(this.option, option, {
      reporter: { ...this.option.reporter, ...option.reporter },
    })

    // disable in Devtools
    if (isDevtools) {
      this.option.reporter!.realtime = false
      this.option.reporter!.feedback = false
      this.option.timestamp = false
    }

    if (canIUse('getRealtimeLogManager') && this.option.reporter?.realtime) {
      attempt(() => {
        this.realtimeReporter ||= getRealtimeLogManager()
        this.realtimeReporter.setFilterMsg(this.name)
      })
    }

    if (canIUse('getLogManager') && this.option.reporter?.feedback) {
      attempt(() => {
        this.feedbackReporter ||= getLogManager()
      })
    }

    this.debug('#Logger', this.option)
  }

  private report(level: LogLevel, msgs: any[], filters: any[]) {
    const reporter = this.option.reporter ?? {}

    const meta = (): Meta => ({
      route: Current.router ? Route.generate(Current.router.path, Current.router.params) : undefined,
      timestamp: Date.now(),
    })

    const report = () => {
      if (level === 'debug') return

      if (reporter.realtime)
        attempt(() => {
          if (this.realtimeReporter) {
            Current.page && this.realtimeReporter.in(Current.page)
            filters.forEach((i) => this.realtimeReporter!.addFilterMsg(i))
            this.option.meta && msgs.push('meta:', meta())
            this.realtimeReporter![level](...msgs)
          }
        })

      if (reporter.feedback) {
        attempt(() => {
          if (this.feedbackReporter) {
            this.option.meta && msgs.push('meta:', meta())
            switch (level) {
              case 'error':
                this.feedbackReporter.warn({ level, filters }, ...msgs)
                break

              case 'warn':
                this.feedbackReporter.warn({ level, filters }, ...msgs)
                break

              case 'info':
                this.feedbackReporter.info({ level, filters }, ...msgs)
                break
            }
          }
        })
      }

      if (isFunction(reporter.custom)) {
        attempt(() => {
          reporter.custom!({ level, filters, msgs, meta: meta() })
        })
      }
    }

    return { report }
  }

  private output(level: LogLevel, msgs: any[]) {
    const println = console[level] ?? console.log

    if (this.option.timestamp) {
      const now = new Date()
      const h = now.getHours().toString().padStart(2, '0'),
        m = now.getMinutes().toString().padStart(2, '0'),
        s = now.getSeconds().toString().padStart(2, '0'),
        ms = now.getMilliseconds().toString().padStart(3, '0')
      msgs.unshift(`${h}:${m}:${s}.${ms}`)
    }

    println.apply(null, msgs)
  }

  private logging(level: LogLevel, msgs: any[]) {
    const outputs: any[] = [this.name]
    const reports: any[] = []
    const filters: string[] = []

    msgs.forEach((msg) => {
      if (isString(msg) && msg.startsWith('#')) {
        const tag = msg.slice(1)
        outputs.push(`[${tag}]`)
        filters.push(tag)
        reports.push(tag)
      } else if (RequestError.is(msg)) {
        const error = msg.normalize()
        outputs.push(error, 'request:', error.request)
        reports.push(error, 'request:', error.request)
      } else {
        outputs.push(msg)
        reports.push(msg)
      }
    })

    this.output(level, outputs)

    return this.report(level, reports, filters)
  }

  /**
   * output & report error message.
   * add filters by hashtags in message ('#filter')
   *
   * @notice it will report log by reporters at the same time if enabled
   * @usage
   * ```ts
   * logger.error('#filter1', '#filter2', new Error('something wrong'))
   * logger.error('#LogCode', 'something', { payload: 1 }, new Error('something wrong'))
   * ```
   */
  error(...msgs: any[]) {
    this.logging('error', msgs).report()
  }

  /**
   * output warn message.
   * add filters by hashtags in message ('#filter')
   *
   * @notice report by `logger.warn(...).report()`
   * @usage
   * ```ts
   * logger.warn('warning', { payload: 1 })
   *
   * // report log
   * logger.warn('#filter', 'warning').report()
   *
   * ```
   */
  warn(...msgs: any[]) {
    return this.logging('warn', msgs)
  }

  /**
   * output info message.
   * add filters by hashtags in message ('#filter')
   *
   * @notice report by `logger.info(...).report()`
   * @usage
   * ```ts
   * logger.info('info', { payload: 1 })
   *
   * // report log
   * logger.info('#filter', 'info').report()
   * ```
   */
  info(...msgs: any[]) {
    return this.logging('info', msgs)
  }

  /**
   * invoke `console.debug` for stdout
   */
  debug(...msgs: any[]) {
    this.logging('debug', msgs)
  }
}
