import { go, toast } from '@min-kit/extends'
import { useQuery } from '@min-kit/hooks'
import { Button, Text, View } from '@tarojs/components'
import clsx from 'clsx'
import { useState } from 'react'

import { Pages } from '@/app.route'
import MinCode from '@/components/code'
import Layout from '@/components/layout'
import httpbin from '@/service/http/httpbin'

import { UsageSnippet } from './demos'

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
    <>
      <Layout title='request'>
        <View className='mb-4'>
          <View className='text-gray-500'>支持中间件实现请求前置和后置拦截</View>
          <View className='text-gray-500'>
            echo-server by{' '}
            <Text className='underline underline-offset-4' onClick={() => go(Pages.H5, { url: 'https://httpbin.org' })}>
              httpbin.org
            </Text>
          </View>
          <View className='mt-2 grid grid-cols-2 gap-4'>
            {[200, 400, 401, 500, 502].map((status) => (
              <Button
                key={status}
                className={clsx(
                  'btn px-2.5 py-1.5 flex-center text-xs text-black bg-white border border-solid border-black rounded-lg',
                  current === status && 'bg-orange-400',
                )}
                hoverClass='brightness-90'
                onClick={() => Query.query(status)}>
                echo {status}
              </Button>
            ))}
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
    </>
  )
}

definePageConfig({
  navigationBarTitleText: 'request',
})
