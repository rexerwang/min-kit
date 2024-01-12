import { ShareButton, useShareMessage } from '@min-kit/components'
import { logger } from '@min-kit/extends'
import { Route, UTM } from '@min-kit/shared'
import { Button, View } from '@tarojs/components'

import { Pages } from '@/app.route'
import MinCode from '@/components/code'
import Layout from '@/components/layout'

import shareModal from './components/share-modal'
import { UsageSnippet } from './demos'

export default function Index() {
  useShareMessage()

  return (
    <Layout title='分享组件'>
      <View className='mb-4'>
        <View className='text-gray-500'>
          适用于复杂页面下的分享场景。`useShareMessage` 与 `ShareButton` 搭配使用完成深层嵌套组件中的分享功能。
        </View>
        <View>
          <ShareButton
            className='btn mt-2 px-4 py-2.5 text-left font-semibold leading-none text-black bg-white rounded-full'
            hoverClass='shadow'
            message={{
              title: '来自 ShareButton 分享',
              path: Route.generate(Pages.Index, UTM.generate(UTM.Sources.shareFriends)),
            }}
            onShare={() => logger.debug('ShareButton.onShare')}>
            ShareButton 分享
          </ShareButton>
          <Button
            className='btn mt-2 px-4 py-2.5 text-left font-semibold leading-none text-black bg-white rounded-full'
            hoverClass='shadow'
            onClick={() => {
              shareModal({ position: 'bottom', backdropCloseable: true })
            }}>
            弹窗分享
          </Button>
        </View>
      </View>

      <View>
        <View className='font-semibold'>example</View>
        <Button
          className='btn mt-2 m px-2.5 py-1.5 flex-center text-xs text-black bg-white border border-solid border-black rounded-lg'
          hoverClass='brightness-90'
          onClick={() => MinCode.popup({ code: UsageSnippet })}>
          show code
        </Button>
      </View>
    </Layout>
  )
}

definePageConfig({
  navigationBarTitleText: '分享组件',
  enableShareAppMessage: true,
  enableShareTimeline: true,
})
