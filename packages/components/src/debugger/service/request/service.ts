import { logger } from '@min-kit/extends'
import { isEmpty, qs } from '@min-kit/shared'

import { RequestRecord, requestStore } from '../../store'
import { getRequestProxy } from './proxy'

import type { AnyObject } from '../../../types'

export default class RequestProxyService {
  private started = false
  private counter = 0
  private readonly proxy = getRequestProxy()
  readonly store = requestStore

  constructor(private readonly whitelist: string[] = []) {}

  private getReqId(timestamp: number) {
    return `${++this.counter}.${timestamp}`
  }

  private isJSON(header?: AnyObject) {
    if (!header) return false

    const contentType: string | undefined = header['content-type'] || header['Content-Type']

    return !!contentType && contentType.includes('json')
  }

  private transformData(header: any, data: any) {
    if (typeof data !== 'string') return data

    if (this.isJSON(header)) {
      try {
        return JSON.parse(data)
      } catch (error) {
        return data
      }
    }

    return data
  }

  private recordRequest(option: Taro.request.Option) {
    const requestStart = Date.now()
    const reqId = this.getReqId(requestStart)
    const method = (option.method || 'GET').toUpperCase()

    let data = isEmpty(option.data) ? undefined : option.data
    let { url, query } = qs.parseUrl(option.url)

    // Fix: `option.data` maybe means to `query-string` when it is GET request.
    if (method === 'GET' && isEmpty(query) && data) {
      query = data
      data = undefined
      url += '?' + qs.stringify(query)
    } else {
      url = option.url
    }

    this.store.insert({
      reqId,
      url,
      method,
      requestStart,
      request: {
        header: option.header as any,
        data,
        query: isEmpty(query) ? undefined : query,
      },
    })
    return reqId
  }

  private recordResponse(reqId: string, response: any) {
    this.store.update({
      reqId,
      statusCode: response.statusCode,
      responseEnd: Date.now(),
      response: {
        data: this.transformData(response.header, response.data),
        header: response.header,
      },
      profile: response.profile,
    })
  }

  private request(option: Taro.request.Option) {
    if (this.whitelist.findIndex((domain) => option.url.indexOf(domain) > -1) > -1) {
      return this.proxy.request(option)
    }

    const reqId = this.recordRequest(option)

    return this.proxy.request({
      ...option,
      success: (res) => {
        option.success && option.success(res)
        this.recordResponse(reqId, res)
      },
      fail: (res) => {
        option.fail && option.fail(res)
        this.recordResponse(reqId, res)
      },
    })
  }

  generate(client: string, record: RequestRecord) {
    const { url, method, request } = record

    const ln = '\\\n  '
    let cmd = ''

    switch (client) {
      case 'cURL':
        cmd +=
          `curl '${url}' ${ln}` +
          Object.entries(request.header)
            .map(([k, v]) => `-H '${k}:${v}' ${ln}`)
            .join('') +
          `-X ${method} ${ln}`
        if (request.data) {
          cmd += `-H 'Content-Type: application/json' ${ln}` + `--data-binary '${JSON.stringify(request.data)}' ${ln}`
        }
        cmd += '--compressed'
        break

      case 'HTTPie':
        if (request.data) {
          cmd += `echo -n '${JSON.stringify(request.data)}' | `
        }
        cmd +=
          `http ${method} '${url}' ${ln}` +
          `${Object.entries(request.header)
            .map(([k, v]) => `'${k}:${v}'`)
            .join(' ')}`
        break

      default:
        break
    }

    return cmd
  }

  start() {
    if (!this.started) {
      this.started = true
      this.proxy.inject(this.request.bind(this))
      logger.debug('#RequestProxyService', 'start...')
    }
  }

  stop() {
    if (this.started) {
      this.started = true
      this.proxy.uninject()
      logger.debug('#RequestProxyService', 'start...')
    }
  }
}
