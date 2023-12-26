import { MinText } from '@min-kit/components'
import { logger, toast } from '@min-kit/extends'
import { Button, View } from '@tarojs/components'

import MinCode from '@/components/code'
import Layout from '@/components/layout'

import { UsageSnippet } from './demos'

export default function Index() {
  return (
    <>
      <Layout title='logger'>
        <View className='mb-4'>
          <View className='text-gray-500'>
            <MinText>
              {`格式化输出日志并上报
  + reporter:
    - realtime: 实时日志管理器
    - feedback: 日志管理器
    - custom: 自定义
  + 设置关键词:
    - logger.error('#filter', error)
`}
            </MinText>
          </View>
          <View className='mt-2 grid grid-cols-2 gap-4'>
            {['error', 'warn', 'info', 'debug'].map((level) => (
              <Button
                key={level}
                className='btn px-2.5 py-1.5 flex-center text-xs text-black bg-white border border-solid border-black rounded-lg'
                hoverClass='brightness-90'
                onClick={() => {
                  logger[level]('#logger-demo', `${level} msg.`)
                  toast('vConsole查看输出')
                }}>
                logger.{level}
              </Button>
            ))}
          </View>
        </View>

        <View className='mb-4'>
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
  navigationBarTitleText: 'logger',
})
