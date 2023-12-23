import { ShareButton, useShareMessage } from '@min-kit/components'
import { toast } from '@min-kit/extends'
import { Route, UTM } from '@min-kit/shared'
import { Button, View } from '@tarojs/components'

import { Pages } from '@/app.route'
import Layout from '@/pkg-demo/components/layout'

import shareModal from './components/share-modal'

export default function Index() {
  useShareMessage()

  return (
    <Layout title='share'>
      <View className='mb-4'>
        <View className='text-gray-500'>小程序分享</View>
        <View>
          <ShareButton
            className='btn mt-2 px-4 py-2.5 text-left font-semibold leading-none text-black bg-white rounded-full'
            hoverClass='shadow'
            message={{
              title: '来自 ShareButton 分享',
              path: Route.generate(Pages.Home, UTM.generate(UTM.Sources.shareFriends)),
            }}
            onShare={() => toast('完成分享')}>
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
    </Layout>
  )
}

definePageConfig({
  navigationBarTitleText: '分享组件',
  enableShareAppMessage: true,
})
