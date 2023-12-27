definePageConfig({
  enableShareAppMessage: true, // 启用分享给好友
  enableShareTimeline: true, // 启用分享到朋友圈
})

export const UsageSnippet = `// pages/index/index.tsx

import { ShareButton, useShareMessage } from '@min-kit/components'
import { logger } from '@min-kit/extends'

export default function Index() {
  useShareMessage({
    message: { title: '右上角菜单标题' },
    timeline: { title: '分享朋友圈标题' },
    onShareAppMessage() {
      logger.debug('onShareAppMessage')
    },
    onShareTimeline() {
      logger.debug('onShareTimeline')
    },
  })

  return (
    <ShareButton
      className='btn'
      message={{ title: '来自 ShareButton 分享' }}
      onShare={() => {
        logger.debug('ShareButton.onShare')
      }}>
      ShareButton 分享
    </ShareButton>
  )
}

`
