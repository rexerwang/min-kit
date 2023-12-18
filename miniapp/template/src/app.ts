import './app.scss'

import { useLaunch } from '@tarojs/taro'

import appStore from './store/app'

function App({ children }: React.PropsWithChildren<any>) {
  useLaunch((options) => {
    appStore.apis.lastSignIn(Date.now(), options.scene)
  })

  // children 是将要会渲染的页面
  return children
}

export default App
