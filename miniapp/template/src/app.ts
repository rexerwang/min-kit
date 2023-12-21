import '@miniapp/components/dist/styles/index.css'
import './assets/styles/index.scss'
import './assets/polyfill'
import './icons'

import { useDebug } from '@miniapp/components'
import { go, logger } from '@miniapp/extends'
import { useError, useLaunch, usePageNotFound, useUnhandledRejection } from '@tarojs/taro'

import { Pages } from './app.route'
import authStore from './shared/store/auth'

function App({ children }: React.PropsWithChildren) {
  useDebug({
    user: {
      getToken: authStore.apis.getToken,
      async getUserInfo(reLogin?: boolean) {
        if (reLogin) await authStore.apis.login()
      },
    },
  })

  useLaunch((opts) => {
    logger.debug('#AppLaunch', opts)
  })

  usePageNotFound((res) => {
    logger.error('#PageNotFound', res)

    go.redirect(Pages.Home)
  })

  useUnhandledRejection(({ reason }) => {
    logger.error('#UnhandledRejection', reason)
  })

  useError((error) => {
    logger.error('#AppError', error)
  })

  return children
}

export default App
