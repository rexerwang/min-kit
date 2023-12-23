import { createRequest, logger } from '@min-kit/extends'

const http = createRequest({ baseUrl: 'https://httpbin.org' }).use(async (ctx, next) => {
  logger.warn('#httpbin', `${ctx.request.method} ${ctx.request.url}`)
  await next()
  logger.warn('#httpbin', `${ctx.request.method} ${ctx.request.url} (${ctx.statusCode})`)
})

function mock<T>(mockData: T, status?: number) {
  return (method: keyof Taro.request.Method, url: string, data?: any) => {
    logger.warn('#httpbin', `Prepare: ${method} ${url}`)
    const api = status ? `status/${status}` : `/${method.toLowerCase()}`
    return http.request({ url: `${api}?x=${encodeURI(url)}`, method, data }).then(() => mockData)
  }
}

export default function httpbin<T>(mockData: T, status?: number) {
  const request = mock(mockData, status)

  return {
    get: (url: string, data?: any) => request('GET', url, data),
    post: (url: string, data?: any) => request('POST', url, data),
    delete: (url: string, data?: any) => request('DELETE', url, data),
    put: (url: string, data?: any) => request('PUT', url, data),
    patch: (url: string, data?: any) => request('PATCH', url, data),
    head: (url: string, data?: any) => request('HEAD', url, data),
    options: (url: string, data?: any) => request('OPTIONS', url, data),
  }
}

httpbin.http = http
