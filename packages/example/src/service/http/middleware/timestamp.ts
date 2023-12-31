import type { Middleware } from '@min-kit/extends'

export function timestamp(key = '_'): Middleware {
  return async (ctx, next) => {
    if (ctx.request.method === 'GET') {
      ctx.request.data = { ...ctx.request.data, [key]: Date.now() }
    }

    await next()
  }
}
