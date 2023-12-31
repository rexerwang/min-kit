import { defineAppConfigChain } from '@min-kit/helper/app'
import { isString } from '@min-kit/shared'

import NAME from './app.name'
import { Routes } from './app.route'

export default defineAppConfigChain((chain) => {
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
})
