import { defineRouteConfig } from '../defineRouteConfig'

describe('defineRouteConfig', () => {
  it('should defineRouteConfig did work', () => {
    const { Pages, Routes } = defineRouteConfig({
      Home: 'pages/index/index',
      PkgAbc: {
        Home: 'pages/index/index',
      },
    })

    expect(Pages).toEqual({
      Home: '/pages/index/index',
      PkgAbc: {
        Home: '/pkg-abc/pages/index/index',
      },
    })

    expect(Routes).toEqual({
      Home: 'pages/index/index',
      PkgAbc: {
        Home: 'pages/index/index',
      },
    })
  })

  it('it should throw error when given invalid keys', () => {
    expect(() => defineRouteConfig({ a_b_c: 'pages/index/index' })).toThrow(/Only letters or numbers are allowed/)
  })
})
