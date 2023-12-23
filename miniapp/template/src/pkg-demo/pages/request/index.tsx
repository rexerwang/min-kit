import { go, toast } from '@min-kit/extends'
import { useQuery } from '@min-kit/hooks'
import { Button, Text, View } from '@tarojs/components'
import { useState } from 'react'

import { Pages } from '@/app.route'
import Layout from '@/pkg-demo/components/layout'
import httpbin from '@/service/http/httpbin'

export default function Index() {
  const [current, setCurrent] = useState(0)
  const Query = useQuery(async (status: number) => {
    setCurrent(status)
    try {
      await httpbin(null, status).get('/mock-status')
      toast.success()
    } catch (e) {
      toast(`Failed ${e.ctx.statusCode}`)
    }
    setCurrent(0)
  })

  return (
    <Layout title='request'>
      <View className='mb-4'>
        <View className='text-gray-500'>支持中间件实现请求前置和后置拦截</View>
        <View className='text-gray-500'>
          echo-server by{' '}
          <Text
            className='underline underline-offset-4'
            onClick={() => go(Pages.PkgDemo.H5, { url: 'https://httpbin.org' })}>
            httpbin.org
          </Text>
        </View>
        <View className='grid grid-cols-2 gap-2'>
          {[200, 400, 401, 500, 502].map((status) => (
            <Button
              key={status}
              className='btn mt-2 px-4 py-2.5 text-left font-semibold leading-none text-black bg-white rounded-full'
              hoverClass='shadow'
              loading={current === status}
              onClick={() => Query.query(status)}>
              echo {status}
            </Button>
          ))}
        </View>
      </View>
    </Layout>
  )
}

definePageConfig({
  navigationBarTitleText: 'request',
})
