import { go, logger } from '@min-kit/extends'
import { useLoad } from '@tarojs/taro'

import { Pages } from '@/app.route'

export default function Index() {
  useLoad(() => {
    logger.debug('#pages', Pages)
    go.redirect(Pages.PkgDemo.Home)
  })

  return <></>
}

definePageConfig({})
