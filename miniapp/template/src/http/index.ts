import { create } from '@miniapp/extends'

const http = create({ baseUrl: 'https://httpbin.org' })
  // add headers
  .use(async (ctx, next) => {
    ctx.set('x-request-by', '@miniapp/shared')

    await next()
  })
  // add timestamp
  .use(async (ctx, next) => {
    if (ctx.request.method === 'GET') {
      ctx.request.data = { ...ctx.request.data, _: Date.now() }
    }

    await next()
  })

export default http
