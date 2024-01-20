/* eslint no-console: 0 */
import { attempt, isFunction, isString, Route } from '@min-kit/shared'
import { canIUse, Current, getLogManager, getRealtimeLogManager, getSystemInfoSync } from '@tarojs/taro'

import { RequestError } from '../request/RequestError'

type LogLevel = 'error' | 'warn' | 'info' | 'debug'
type LogMeta = { name: string; filters: string[]; route?: string; timestamp: number }

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
    custom?(log: { level: LogLevel; messages: any[]; meta: LogMeta }): any
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

    const meta = (): LogMeta => ({
      name: this.name,
      filters,
      route: Current.router ? Route.generate(Current.router.path, Current.router.params) : undefined,
      timestamp: Date.now(),
    })

    const report = () => {
      if (level === 'debug') return

      if (reporter.realtime && this.realtimeReporter) {
        attempt(() => {
          Current.page && this.realtimeReporter!.in(Current.page)
          filters.forEach((i) => this.realtimeReporter!.addFilterMsg(i))
          const messages = this.option.meta ? [meta(), ...msgs] : msgs
          this.realtimeReporter![level](...messages)
        })
      }

      if (reporter.feedback && this.feedbackReporter) {
        attempt(() => {
          const messages = this.option.meta ? [meta(), ...msgs] : msgs
          switch (level) {
            case 'error':
              this.feedbackReporter!.warn({ level, filters }, ...messages)
              break

            case 'warn':
              this.feedbackReporter!.warn({ level, filters }, ...messages)
              break

            case 'info':
              this.feedbackReporter!.info({ level, filters }, ...messages)
              break
          }
        })
      }

      if (isFunction(reporter.custom)) {
        attempt(() => {
          reporter.custom!({ level, messages: msgs, meta: meta() })
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
    const tags: string[] = []
    const outputs: any[] = []

    let hashtag = -1 // start index
    msgs.forEach((msg, i) => {
      if (isString(msg) && msg.startsWith('#') && hashtag + 1 === i) {
        hashtag = i
        tags.push(msg.slice(1))
      } else if (RequestError.is(msg)) {
        const error = msg.normalize()
        outputs.push(error, 'request:', error.request)
      } else {
        outputs.push(msg)
      }
    })

    this.output(
      level,
      [this.name].concat(
        tags.map((v) => `[${v}]`),
        outputs,
      ),
    )

    return this.report(level, outputs, tags)
  }

  /**
   * output & report error message.
   * add filters by hashtags in messages head ('#filter')
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
   * add filters by hashtags in messages head ('#filter')
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
   * add filters by hashtags in messages head ('#filter')
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
   * add filters by hashtags in messages head ('#filter')
   */
  debug(...msgs: any[]) {
    this.logging('debug', msgs)
  }
}
