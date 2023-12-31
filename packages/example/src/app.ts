import '@min-kit/components/dist/styles/index.css'
import './assets/styles/index.scss'
import './icons.config'

import { MinDebugger } from '@min-kit/components'
import { go, logger } from '@min-kit/extends'
import { useError, useLaunch, usePageNotFound, useUnhandledRejection } from '@tarojs/taro'

import { Pages } from './app.route'

function App({ children }: React.PropsWithChildren) {
  MinDebugger.use()

  useLaunch((opts) => {
    logger.debug('#AppLaunch', opts)
  })

  usePageNotFound((res) => {
    logger.error('#PageNotFound', res)

    go.redirect(Pages.Index)
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
