import Taro from '@tarojs/taro'

import * as _configs from '../config'

const url = '/pages/index/index'

describe('go', () => {
  const navigateBackSpy = jest.spyOn(Taro, 'navigateBack')
  const navigateToSpy = jest.spyOn(Taro, 'navigateTo')
  const navigateToMiniProgramSpy = jest.spyOn(Taro, 'navigateToMiniProgram')
  const redirectToSpy = jest.spyOn(Taro, 'redirectTo')
  const reLaunchSpy = jest.spyOn(Taro, 'reLaunch')
  const switchTabSpy = jest.spyOn(Taro, 'switchTab')
  const hasTabBarSpy = jest.spyOn(_configs, 'hasTabBar')

  beforeEach(() => {
    navigateBackSpy.mockImplementation(jest.fn().mockResolvedValue({}))
    navigateToSpy.mockImplementation(jest.fn().mockResolvedValue({}))
    navigateToMiniProgramSpy.mockImplementation(jest.fn().mockResolvedValue({}))
    redirectToSpy.mockImplementation(jest.fn().mockResolvedValue({}))
    reLaunchSpy.mockImplementation(jest.fn().mockResolvedValue({}))
    switchTabSpy.mockImplementation(jest.fn().mockResolvedValue({}))
    hasTabBarSpy.mockImplementation((path) => !!path?.includes('tab'))
  })

  afterEach(() => {
    navigateBackSpy.mockClear()
    navigateToSpy.mockClear()
    navigateToMiniProgramSpy.mockClear()
    redirectToSpy.mockClear()
    reLaunchSpy.mockClear()
    switchTabSpy.mockClear()
    hasTabBarSpy.mockClear()
  })

  it('should navigateTo via go', async () => {
    const { go } = await import('../go')
    go(url, { test: 'test' })
    expect(navigateToSpy).toHaveBeenCalledWith({ url: url + '?test=test' })
  })

  it('should navigateBack via go.back', async () => {
    const { go } = await import('../go')
    go.back()
    expect(navigateBackSpy).toHaveBeenCalled()
  })

  it('should redirect fallback path via go.back when navigateBack at first page', async () => {
    navigateBackSpy.mockImplementation(jest.fn().mockRejectedValue({ errMsg: 'at first page' }))

    await jest.isolateModulesAsync(async () => {
      const { go } = await import('../go')
      await go.back(url)
      expect(navigateBackSpy).toHaveBeenCalled()
      expect(redirectToSpy).toHaveBeenCalledWith({ url })

      await expect(go.back()).rejects.toEqual(expect.any(Object))
    })
  })

  it('should redirectTo via go.redirect', async () => {
    const { go } = await import('../go')
    go.redirect(url, 'test=test')
    expect(redirectToSpy).toHaveBeenCalledWith({ url: url + '?test=test' })
  })

  it('should reLaunch via go.reLaunch', async () => {
    const { go } = await import('../go')
    go.reLaunch(url)
    expect(reLaunchSpy).toHaveBeenCalledWith({ url })
  })

  it('should switchTab via go.reLaunch when given url is a tab page', async () => {
    const { go } = await import('../go')
    go('/pages/tab/index', 'test=test')
    expect(switchTabSpy).toHaveBeenCalledWith({ url: '/pages/tab/index' })
  })

  it('should navigateToMiniProgram via go.miniProgram', async () => {
    const { go } = await import('../go')
    go.miniProgram(url as any)
    expect(navigateToMiniProgramSpy).toHaveBeenCalledWith(url)
  })
})
