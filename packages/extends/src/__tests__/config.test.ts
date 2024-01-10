import { hasNavBar, hasTabBar } from '../config'
import Current from '../current'

describe('config', () => {
  it('should hasNavBar did work when given current page config', () => {
    const replacer = jest.replaceProperty(Current, 'page', { config: { navigationStyle: 'custom' } } as any)
    expect(hasNavBar()).toBe(false)
    replacer.restore()
  })

  it('should hasNavBar did work when given current app config', () => {
    const replacer = jest.replaceProperty(Current, 'app', { config: { window: { navigationStyle: 'custom' } } } as any)
    expect(hasNavBar()).toBe(false)
    replacer.restore()
  })

  it('should hasTabBar did work when without current app', () => {
    expect(hasTabBar()).toBe(false)
  })

  it('should hasTabBar did work when without tabBar', () => {
    const replacer = jest.replaceProperty(Current, 'router', { path: '/pages/index/index' } as any)
    expect(hasTabBar()).toBe(false)
    replacer.restore()
  })

  it('should hasTabBar did work when given current tabBar', () => {
    const replaceRouter = jest.replaceProperty(Current, 'router', { path: '/pages/index/index' } as any)
    const replaceApp = jest.replaceProperty(Current, 'app', {
      config: { tabBar: { list: [{ pagePath: '/pages/index/index' }] } },
    } as any)
    expect(hasTabBar()).toBe(true)
    replaceRouter.restore()
    replaceApp.restore()
  })
})
