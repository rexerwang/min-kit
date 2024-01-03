import { request as requestTaroApi } from '@tarojs/taro'

import { AbortControllerImpl } from './AbortControllerImpl'
import { compose } from './compose'
import { RequestError } from './RequestError'
import { cloneObj, joinUrl, omit } from './utils'

type AnyObject = TaroGeneral.IAnyObject
type Method = keyof Taro.request.Method
type Response = Taro.request.SuccessCallbackResult
type RequestOption = Omit<Taro.request.Option, 'success' | 'fail' | 'complete'>

export interface RequestConfig {
  baseUrl?: string
  header?: AnyObject
  timeout?: number
}

export interface IRequest extends RequestOption, RequestConfig {
  abort?: AbortControllerImpl
  /** replay count # */
  replayed?: number
}

export interface IResponse<T = any> extends Response {
  data: T
}

export interface IContext<T = any> extends IResponse<T> {
  /** `statusCode` is 200 ~ 299 */
  ok: boolean
  request: IRequest & { header: AnyObject; method: Method }
  /**
   * set header
   *
   * @throws if sent the request
   */
  set(this: this, name: string, value?: string | null): this
  /**
   * abort request
   *
   * @throws if sent the request
   */
  abort(this: this): void
  /** throw an {@link RequestError} */
  throw(this: this, e: string | Error): void
  /**
   * Replay current request
   * And assign new context to current, with replay`s response
   *
   * @throws before send the request
   */
  replay(this: this): Promise<void>
}

export type Middleware = (ctx: IContext, next: () => Promise<void>) => Promise<void>

type AliasOption = Omit<IRequest, 'url' | 'data'>

/**
 * Fork from https://github.com/rexerwang/requete
 */
export class Request {
  private config: RequestConfig
  private middlewares: Middleware[] = []

  constructor(config: RequestConfig = {}) {
    this.config = config
  }

  use(middleware: Middleware) {
    this.middlewares.push(middleware)
    return this
  }

  private createRequest(config: IRequest) {
    const request: IContext['request'] = Object.assign({ header: {}, method: 'GET' }, this.config, config)

    request.url = joinUrl(request.url, request.baseUrl)

    return request
  }

  private createContext<T>(config: IRequest) {
    const root = this

    const ctx: IContext<T> = {
      request: this.createRequest(config),
      ok: false,
      statusCode: -1,
      data: undefined as unknown as T,
      header: {},
      errMsg: 'Before Request',
      set(name, value) {
        if (this.statusCode !== -1) this.throw('Cannot set request headers after next().')

        if (value == null) {
          delete this.request.header[name]
        } else {
          this.request.header[name] = value
        }

        return this
      },
      abort() {
        if (this.statusCode !== -1) this.throw('Cannot abort request after next().')

        if (!this.request.abort) {
          this.request.abort = new AbortControllerImpl()
        }

        this.request.abort.abort()
      },
      throw(e) {
        const error = e instanceof RequestError ? e : new RequestError(e, this)
        console.error(error) // output error directly
        throw error
      },
      async replay() {
        if (this.statusCode === -1) this.throw('Cannot replay request before next().')

        this.request.replayed = (this.request.replayed ?? 0) + 1

        // fixed: clone the request object to avoid its properties (header, data..)
        // may be converted to `readonly` in somehow by the native api.
        const newCtx = await root.request(cloneObj(this.request))
        Object.assign(this, newCtx)
      },
    }

    return ctx
  }

  private async invoke(ctx: IContext) {
    if (ctx.request.abort?.signal.aborted) ctx.throw('request aborted')

    const requestTask = requestTaroApi(omit(ctx.request, ['abort', 'baseUrl', 'replayed']))
    ctx.request.abort?.on(() => requestTask.abort())

    const response = await requestTask

    Object.assign(ctx, response, {
      ok: !!response.statusCode && response.statusCode >= 200 && response.statusCode < 300,
    })
  }

  async request<T = any>(config: IRequest) {
    // create context
    const context = this.createContext<T>(config)

    // exec middleware
    await compose(this.middlewares)(context, this.invoke.bind(this))

    if (!context.ok) {
      context.throw(`${context.request.method} ${context.request.url} ${context.statusCode} (${context.errMsg})`)
    }

    return context
  }

  get<T = any>(url: string, data?: any, option?: AliasOption) {
    return this.request<T>({ ...option, url, data, method: 'GET' })
  }
  delete<T = any>(url: string, data?: any, option?: AliasOption) {
    return this.request<T>({ ...option, url, data, method: 'DELETE' })
  }
  head<T = any>(url: string, data?: any, option?: AliasOption) {
    return this.request<T>({ ...option, url, data, method: 'HEAD' })
  }
  options<T = any>(url: string, data?: any, option?: AliasOption) {
    return this.request<T>({ ...option, url, data, method: 'OPTIONS' })
  }
  post<T = any>(url: string, data?: any, option?: AliasOption) {
    return this.request<T>({ ...option, url, data, method: 'POST' })
  }
  put<T = any>(url: string, data?: any, option?: AliasOption) {
    return this.request<T>({ ...option, url, data, method: 'PUT' })
  }
  patch<T = any>(url: string, data?: any, option?: AliasOption) {
    return this.request<T>({ ...option, url, data, method: 'PATCH' })
  }
}
