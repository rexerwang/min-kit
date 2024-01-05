import { spyOnConsole } from '@min-kit/jest'
import Taro from '@tarojs/taro'

const baseUrl = 'https://request-api.com/api'

describe('request', () => {
  const requestSpy = jest.spyOn(Taro, 'request')
  const abortStub = jest.fn()

  beforeEach(() => {
    requestSpy.mockImplementation((request) => {
      const response = Object.assign(
        Promise.resolve({
          statusCode: Number(request.url.split('?').at(0)!.split('/').at(-1)) || 200,
          data: request.data ?? {},
          header: {},
          errMsg: 'ok',
        }),
        { abort: abortStub },
      )
      return response as any
    })
  })

  afterEach(() => {
    requestSpy.mockClear()
    abortStub.mockClear()
  })

  it.each(['get', 'delete', 'head', 'options', 'post', 'put', 'patch'])(
    'should request.%s successfully when given statusCode = 200',
    async (method) => {
      const { createRequest } = await import('../request')
      const http = createRequest({ baseUrl })

      const res = await http[method]('/200', { payload: 'test' })
      expect(res.statusCode).toBe(200)
      expect(requestSpy).toHaveBeenCalledWith({
        url: baseUrl + '/200',
        method: method.toUpperCase(),
        data: {
          payload: 'test',
        },
        header: {},
      })
    },
  )

  it.each(['get', 'delete', 'head', 'options', 'post', 'put', 'patch'])(
    'should request.%s failed when given statusCode = 500',
    async (method) => {
      spyOnConsole('error')

      const { createRequest } = await import('../request')
      const http = createRequest({ baseUrl })

      await expect(() => http[method]('/500', { payload: 'test' })).rejects.toThrow(
        `${method.toUpperCase()} ${baseUrl}/500 500 (ok)`,
      )
    },
  )

  it('should execute middlewares successfully', async () => {
    const { createRequest } = await import('../request')
    const http = createRequest({ baseUrl })

    http.use(async (ctx, next) => {
      ctx.set('x-test', 'test')
      ctx.set('x-abc')
      ctx.request.data = { ...ctx.request.data, a: 'b' }

      await next()
    })

    await http.post('/200', { payload: 'test' }, { header: { 'x-abc': 'abc' } })
    expect(requestSpy).toHaveBeenCalledWith({
      url: baseUrl + '/200',
      method: 'POST',
      data: {
        payload: 'test',
        a: 'b',
      },
      header: {
        'x-test': 'test',
      },
    })
  })

  it('should replay request correctly in middleware', async () => {
    const { createRequest } = await import('../request')
    const http = createRequest({ baseUrl })

    http.use(async (ctx, next) => {
      await next()

      if (!ctx.request.replayed) {
        await ctx.replay()
      }
    })

    const res = await http.get('/200')
    expect(requestSpy).toHaveBeenCalledTimes(res.request.replayed! + 1)
  })

  it('should abort request did work in middleware', async () => {
    const { createRequest, AbortControllerImpl } = await import('../request')

    const http = createRequest({ baseUrl })
    const abort = new AbortControllerImpl()

    await Promise.all([
      http.get('/200', undefined, { abort }),
      Promise.resolve().then(() => abort.abort()),
      Promise.resolve().then(() => abort.abort()), // abort duplicated
    ])

    expect(abortStub).toHaveBeenCalledTimes(1)
  })

  it.each([
    'call ctx.abort() before next()',
    'call ctx.replay() before next()',
    'call next() duplicated',
    'call ctx.set() after next()',
    'call ctx.abort() after next()',
  ])('should throw error when %p in middleware', async (type) => {
    const { createRequest } = await import('../request')
    const http = createRequest({ baseUrl })

    http.use(async (ctx, next) => {
      if (type.includes('before')) {
        if (type.includes('abort')) ctx.abort()
        else if (type.includes('replay')) await ctx.replay()
      }

      await next()

      if (type.includes('duplicated')) await next()
      else if (type.includes('after')) {
        if (type.includes('set')) ctx.set('x-abc', 'abc')
        else if (type.includes('abort')) ctx.abort()
      }
    })

    await expect(http.post('/200')).rejects.toThrowErrorMatchingSnapshot()
  })
})
