export const REQUEST_USAGE_SNIPPET = `import { createRequest, RequestError } from '@min-kit/extends'
import { HttpStatus } from '@min-kit/shared'

const http = createRequest({ baseUrl: 'https://httpbin.org' }).use(async (ctx, next) => {
  // before sending this request,
  // set Authorization header
  ctx.set('Authorization', '<token>')
  // add timestamp to GET request
  if (ctx.request.method === 'GET') {
    ctx.request.data = { ...ctx.request.data, t: Date.now() }
  }

  // waiting for this request responding
  await next()

  // if this request respond 401, refresh token
  if (ctx.statusCode === HttpStatus.UNAUTHORIZED) {
    await renewToken()
  }
})

// send GET request
http.get('/api/get').then((r) => r.data)

// send POST request
http
  .post('/api/post')
  .then((r) => r.data)
  .catch((e) => {
    const error = e as RequestError
    console.error(error.ctx.statusCode, error.ctx.data)
  })`
