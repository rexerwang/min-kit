import './index.scss'

import { ShareButton, useShareMessage } from '@miniapp/components'
import { logger, toast } from '@miniapp/extends'
import { Route } from '@miniapp/shared'
import { Button, View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

import http from '@/http'

export default function Index() {
  useLoad(() => {
    logger.debug('Route.generate', Route.generate('pages/index/index', { a: 1, b: 2 }))
  })

  const request = async () => {
    const res = await http.get('/get')
    await toast.success()
    logger.debug('#httpbin', res.data)
    try {
      await http.get('/status/500')
    } catch (e) {
      toast.error()
      logger.error('#httpbin', e)
    }
  }

  useShareMessage()

  return (
    <View className='index'>
      <View className='p-4 grid grid-cols-2 gap-4'>
        <Button type='primary' size='mini' onClick={request}>
          request
        </Button>
        <ShareButton message={{ title: 'ShareButton' }} type='primary' size='mini'>
          share
        </ShareButton>
      </View>
    </View>
  )
}

definePageConfig({
  enableShareAppMessage: true,
})
