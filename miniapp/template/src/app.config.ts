import { configChain } from '@min-kit/helper/runtime'
import { isString } from '@min-kit/shared'

import { Routes } from './app.route'
import { NAME } from './constants'

export default configChain((chain, { mode }) => {
  const isDev = mode === 'dev'

  chain
    .entryPagePath(Routes.Home)
    .pages(Object.values(Routes).filter(isString))
    .subPackage('pkg-demo')
    .pages(Object.values(Routes.PkgDemo))
    .end()
    .window({
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: NAME,
    })
    .wechat.debug(!isDev)
})
