import { renderHook } from '@min-kit/jest'

describe('useAppRoute', () => {
  it('should delegate `wx.onAppRoute` successfully', async () => {
    let registeredCb: any = null
    jest.spyOn(wx, 'onAppRoute').mockImplementation((cb) => {
      registeredCb = cb
    })

    const { useAppRoute__unstable } = await import('../useAppRoute')

    const listener = jest.fn()
    const { unmount } = renderHook(useAppRoute__unstable, { initialProps: listener })

    registeredCb({ t: 1 })
    expect(listener).toHaveBeenCalledWith({ t: 1 })

    unmount()
    registeredCb({ t: 2 })
    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('should not delegate when `wx.onAppRoute` not exist', async () => {
    jest.replaceProperty(global, 'wx', { onAppRoute: null } as any)

    await jest.isolateModulesAsync(async () => {
      const { logger } = await import('@min-kit/extends')
      const warnSpy = jest.spyOn(logger, 'warn').mockImplementation(jest.fn())

      await import('../useAppRoute')
      expect(warnSpy).toHaveBeenCalledTimes(1)
      expect(warnSpy.mock.calls[0][1].message).toMatch('Not support wx.onAppRoute')
    })
  })
})
