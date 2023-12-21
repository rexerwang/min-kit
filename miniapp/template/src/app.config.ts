import { configChain } from '@miniapp/helper/runtime'
import { isString } from '@miniapp/shared'

import { Routes } from './app.route'
import { NAME } from './shared/constants'

export default configChain((chain, { mode }) => {
  const isProd = mode === 'prod'

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
    .wechat.debug(!isProd)
})
