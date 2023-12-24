import '@min-kit/components/dist/styles/index.css'
import './assets/styles/index.scss'
import './assets/polyfill'
import './icons'

import { useMinDebugger } from '@min-kit/components'
import { go, logger } from '@min-kit/extends'
import { useError, useLaunch, usePageNotFound, useUnhandledRejection } from '@tarojs/taro'

import { Pages } from './app.route'

function App({ children }: React.PropsWithChildren) {
  useMinDebugger()

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
