import './index.scss'

import { ShareButton } from '@miniapp/components'
import { logger, toast } from '@miniapp/extends'
import { Route } from '@miniapp/shared'
import { Text, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

import http from '@/http'

export default function Index() {
  useLoad(async () => {
    logger.debug('Route.generate', Route.generate('pages/index/index', { a: 1, b: 2 }))

    const res = await http.get('/get')
    await toast.success()
    logger.debug('#httpbin', res.data)

    try {
      await http.get('/status/500')
    } catch (e) {
      toast.error()
      logger.error('#httpbin', e)
    }
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>

      <ShareButton message={{ title: 'share from ShareButton' }} />
    </View>
  )
}

definePageConfig({
  enableShareAppMessage: true,
})
