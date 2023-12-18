/* eslint no-console: 0 */
import { attempt, isFunction, isString, Route } from '@miniapp/shared'
import { canIUse, Current, getLogManager, getRealtimeLogManager, getSystemInfoSync } from '@tarojs/taro'

import { RequestError } from '../request/RequestError'

export type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface IOption {
  /** enable record logs by {@link Taro.LogManager}. @supported weapp */
  record?: boolean
  /** enable report logs by {@link Taro.RealtimeLogManager} & custom reporter. @supported weapp */
  report?: boolean
  /** custom reporter */
  reporter?(level: LogLevel, message: any): any
  /** show timestamp */
  timestamp?: boolean
  /** append meta info */
  meta?: boolean
}

const isDevtools = attempt(getSystemInfoSync)?.platform === 'devtools'

export default class Logger {
  private name: string
  private logManager: Taro.LogManager | undefined
  private realtimeLogManager: Taro.RealtimeLogManager | undefined
  private option: IOption

  constructor(name: string, option = {} as IOption) {
    this.name = name
    this.option = Object.assign(
      {
        record: !isDevtools && canIUse('getLogManager'),
        report: !isDevtools && canIUse('getRealtimeLogManager'),
        timestamp: !isDevtools,
        meta: true,
      },
      option,
    )

    if (this.option.record) {
      attempt(() => {
        this.logManager = getLogManager()
      })
    }

    if (this.option.record) {
      attempt(() => {
        this.realtimeLogManager = getRealtimeLogManager()
        this.realtimeLogManager.setFilterMsg(this.name)
      })
    }

    this.debug('#Logger', this.option)
  }

  private meta() {
    return {
      route: Current.router ? Route.generate(Current.router.path, Current.router.params) : undefined,
      timestamp: Date.now(),
    }
  }

  private reporter(level: LogLevel, msgs: any[], filters: any[]) {
    const reporter = {
      /**
       * report log by {@link Taro.RealtimeLogManager}
       */
      report: () => {
        if (level !== 'debug') {
          if (this.realtimeLogManager) {
            attempt(() => {
              Current.page && this.realtimeLogManager!.in(Current.page)
              filters.forEach((i) => this.realtimeLogManager!.addFilterMsg(i))
              this.option.meta && msgs.push('meta:', this.meta())
              this.realtimeLogManager![level](...msgs)
            })
          }

          if (isFunction(this.option.reporter)) {
            attempt(() => {
              this.option.reporter!(level, {
                filters,
                message: msgs,
                meta: this.meta(),
              })
            })
          }
        }

        return reporter
      },

      /**
       * record log by {@link Taro.LogManager}
       */
      record: () => {
        attempt(() => {
          if (this.logManager) {
            this.option.meta && msgs.push('meta:', this.meta())
            switch (level) {
              case 'error':
                this.logManager.warn({ level, filters }, ...msgs)
                break

              case 'warn':
                this.logManager.warn({ level, filters }, ...msgs)
                break

              case 'info':
                this.logManager.info({ level, filters }, ...msgs)
                break
            }
          }
        })

        return reporter
      },
    }

    return reporter
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

    return this.reporter(level, reports, filters)
  }

  /**
   * **Attention: it will report and record logs at the same time**
   * - report log by {@link Taro.RealtimeLogManager}
   * - record log by {@link Taro.LogManager}
   *
   * @usage
   * ```ts
   * // report by `RealtimeLogManager` and record by `LogManager` at the same time
   * // add filters for `RealtimeLogManager.addFilter` with hashtags ('#')
   * logger.error('#filter1', '#filter2', new Error('something wrong'))
   * logger.error('#LogCode', 'something', { payload: 1 }, new Error('something wrong'))
   * ```
   */
  error(...msgs: any[]) {
    this.logging('error', msgs).record().report()
  }

  /**
   * @usage
   * ```ts
   * logger.warn('warning', { payload: 1 })
   *
   * // report by `RealtimeLogManager`
   * // add filters for `RealtimeLogManager.addFilter` with hashtags ('#')
   * logger.warn('#filter', 'warning').report()
   *
   * // record by `LogManager`
   * logger.warn('#filter', 'warning').record()
   * ```
   */
  warn(...msgs: any[]) {
    return this.logging('warn', msgs)
  }

  /**
   * @usage
   * ```ts
   * logger.info('something', { payload: 1 })
   *
   * // report by `RealtimeLogManager`
   * // add filters for `RealtimeLogManager.addFilter` with hashtags ('#')
   * logger.info('#filter', 'something').report()
   *
   * // record by `LogManager`
   * logger.info('#filter', 'something').record()
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
