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

  static is(value: unknown): value is RequestError {
    return value instanceof RequestError
  }
}
