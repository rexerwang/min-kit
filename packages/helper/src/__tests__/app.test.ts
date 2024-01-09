import { defineAppConfigChain, defineRouteConfig } from '../app'

describe('app specs', () => {
  describe('defineAppConfigChain', () => {
    it('should set app.config when given `TARO_ENV` is weapp', () => {
      jest.replaceProperty(process.env, 'TARO_ENV', 'weapp')

      expect(
        defineAppConfigChain((chain, { env }) => {
          chain
            .entryPagePath('pages/index/index')
            .pages(['pages/index/index', 'pages/order/index'])
            .subPackage('pkg-abc')
            .pages(['pages/index/index'])
            .plugin('plugin-id', { provider: 'plugin-provider', version: '1.0.0' })
            .end()
            .wechat.debug(env === 'development')
            .plugin('plugin-id', { provider: 'plugin-provider', version: '1.0.0' })
            .darkMode()
            .permission('get location desc')
            .requiredBackgroundModes(['location'])
            .requiredPrivateInfos(['getLocation'])
            .skyline()
            .end()
            .window({
              navigationBarTitleText: 'min-kit',
              navigationStyle: 'custom',
            })
            .tabBar({
              color: '#000',
              selectedColor: '#000',
              backgroundColor: '#fff',
              list: [
                {
                  pagePath: 'pages/index/index',
                  iconPath: 'home.png',
                  selectedIconPath: 'home.active.png',
                  text: 'Home',
                },
                {
                  pagePath: 'pages/order/index',
                  iconPath: 'order.png',
                  selectedIconPath: 'order.active.png',
                  text: 'Order',
                },
              ],
            })
        }),
      ).toMatchSnapshot()
    })

    it('should throw error when not set pages', () => {
      expect(() =>
        defineAppConfigChain((chain) => {
          chain.window({ navigationBarTitleText: 'min-kit' })
        }),
      ).toThrow('Please set pages via `chain.pages()`')
    })
  })

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
})
