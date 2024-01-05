import { configChain } from '@min-kit/helper/runtime'
import { isString } from '@min-kit/shared'

import NAME from './app.name'
import { Routes } from './app.route'

export default configChain((chain, { mode }) => {
  const isDev = mode === 'dev'

  chain
    .entryPagePath(Routes.Index)
    .pages(Object.values(Routes).filter(isString))
    .subPackage('pkg-components')
    .pages(Object.values(Routes.PkgComponents))
    .end()
    .subPackage('pkg-extends')
    .pages(Object.values(Routes.PkgExtends))
    .end()
    .subPackage('pkg-store')
    .pages(Object.values(Routes.PkgStore))
    .end()
    .window({
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: NAME,
    })
    .wechat.debug(isDev)
})
