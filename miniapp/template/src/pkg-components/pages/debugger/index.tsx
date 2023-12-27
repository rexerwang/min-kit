import { MinDebugger, MinText } from '@min-kit/components'
import { SystemInfo } from '@min-kit/extends'
import { Button, View } from '@tarojs/components'

import MinCode from '@/components/code'
import Layout from '@/components/layout'

import { UsageSnippet } from './demos'

export default function Index() {
  return (
    <>
      <Layout title='MinDebugger'>
        <View className='absolute -top-5 right-2 font-light text-2xs text-gray-500'>* 本页面仅作示例开启入口</View>
        <View className='mb-4'>
          <View className='text-gray-500 break-all'>
            <MinText>{`MinDebugger是一个增强调试面板，包含以下功能：
  - 请求: 网络请求监控
  - 状态: 用户和小程序状态
  - 应用: 页面栈信息、本地缓存管理、订阅消息授权

在 \`app.ts\` 中调用 \`useMinDebugger\` 即可作用于所有页面。
在开启小程序「开发调试」模式后就会显示「debugger」入口（类似vConsole）。
`}</MinText>
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

      {!SystemInfo.enableDebug && <MinDebugger />}
    </>
  )
}

definePageConfig({
  navigationBarTitleText: 'MinDebugger',
})
