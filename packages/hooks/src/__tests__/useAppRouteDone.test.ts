import { renderHook } from '@min-kit/jest'

describe('useAppRouteDone', () => {
  it('should delegate `wx.onAppRouteDone` successfully', async () => {
    let registeredCb: any = null
    jest.spyOn(wx, 'onAppRouteDone').mockImplementation((cb) => {
      registeredCb = cb
    })

    const { useAppRouteDone__unstable } = await import('../useAppRouteDone')

    const listener = jest.fn()
    const { unmount } = renderHook(useAppRouteDone__unstable, { initialProps: listener })

    registeredCb({ t: 1 })
    expect(listener).toHaveBeenCalledWith({ t: 1 })

    unmount()
    registeredCb({ t: 2 })
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should not delegate when `wx.onAppRouteDone` not exist', async () => {
    jest.replaceProperty(global, 'wx', { onAppRouteDone: null } as any)

    await jest.isolateModulesAsync(async () => {
      const { logger } = await import('@min-kit/extends')
      const errorSpy = jest.spyOn(logger, 'error').mockImplementation(jest.fn())

      await import('../useAppRouteDone')
      expect(errorSpy).toHaveBeenCalledTimes(1)
      expect(errorSpy.mock.calls[0][1].message).toMatch('Not support wx.onAppRouteDone')
    })
  })
})
