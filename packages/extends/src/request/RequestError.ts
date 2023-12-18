import type { IContext } from './Request'

export class RequestError extends Error {
  name = 'RequestError'
  ctx: IContext

  constructor(message: string | Error, ctx: IContext) {
    const err = message as any

    super(err.message ?? err)

    if (err.stack) {
      this.stack = err.stack
    }

    this.ctx = ctx
  }

  normalize() {
    const error = new Error(this.message)
    error.name = this.name
    error.stack = this.stack

    const request = {
      statusCode: this.ctx.statusCode,
      data: this.ctx.data,
      header: this.ctx.header,
      request: {
        url: this.ctx.request.url,
        data: this.ctx.request.data,
        header: this.ctx.request.header,
        replayed: this.ctx.request.replayed,
      },
    }

    return Object.assign(error, { request })
  }

  static is(value: unknown): value is RequestError {
    return value instanceof RequestError
  }
}
