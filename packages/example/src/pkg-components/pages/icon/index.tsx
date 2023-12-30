import { MinIcon, MinText } from '@min-kit/components'
import { copy } from '@min-kit/extends'
import { Button, View } from '@tarojs/components'

import MinCode from '@/components/code'
import Layout from '@/components/layout'

import {
  MinIconFontPropTypeSnippet,
  MinIconFontUsageSnippet,
  MinIconPropTypeSnippet,
  MinIconUsageSnippet,
} from './demos'

export default function Index() {
  return (
    <>
      <Layout title='图标组件'>
        <View className='mb-4'>
          <View className='flex-center-y'>
            <View className='font-semibold'>MinIcon</View>
            <View className='flex-1 h-[1px] mx-4 border-b border-dashed border-gray-400'></View>
            <View
              className='w-fit text-xs leading-none text-black underline underline-offset-2'
              onClick={() => MinCode.popup({ title: 'Props', lang: 'd.ts', code: MinIconPropTypeSnippet })}>
              Props
            </View>
          </View>

          <View className='my-1 text-xs text-gray-400'>
            {'<MinIcon /> 使用image组件加载图标，图标来源通过 MinIcon.load() 配置'}
          </View>

          <View className='mt-3 p-3 bg-white rounded-lg'>
            <View className='mt-4 grid grid-cols-4 gap-4'>
              {Object.keys(MinIcon.configs).map((name) => (
                <View key={name} className='flex-center flex-col'>
                  <View
                    className='p-1 bg-neutral-100 rounded'
                    hoverClass='bg-gray-900'
                    onClick={() => copy(`<MinIcon name='${name}' />`)}>
                    <MinIcon name={name} size={32} />
                  </View>
                  <View className='text-xs'>{name}</View>
                </View>
              ))}
            </View>

            <View className='mt-4'>
              <View className='font-semibold'>example</View>
              <Button
                className='btn mt-2 m px-2.5 py-1.5 flex-center text-xs text-black bg-white border border-solid border-black rounded-lg'
                hoverClass='brightness-90'
                onClick={() => MinCode.popup({ lang: 'tsx', code: MinIconUsageSnippet })}>
                show code
              </Button>
            </View>
          </View>
        </View>

        <View className='mb-4'>
          <View className='flex-center-y'>
            <View className='font-semibold'>MinIcon.Font</View>
            <View className='flex-1 h-[1px] mx-4 border-b border-dashed border-gray-400'></View>
            <View
              className='w-fit text-xs leading-none text-black underline underline-offset-2'
              onClick={() => MinCode.popup({ title: 'Props', lang: 'd.ts', code: MinIconFontPropTypeSnippet })}>
              Props
            </View>
          </View>

          <View className='my-1 text-xs text-gray-400'>
            <MinText>
              图标字体组件 默认className为&quot;iconfont&quot;. 样式和字体文件可在
              <MinText className='underline'>iconfont.cn</MinText>
              自行下载
            </MinText>
          </View>

          <View className='mt-3 p-3 bg-white rounded-lg'>
            <View>
              <View className='font-semibold'>example</View>
              <Button
                className='btn mt-2 m px-2.5 py-1.5 flex-center text-xs text-black bg-white border border-solid border-black rounded-lg'
                hoverClass='brightness-90'
                onClick={() => MinCode.popup({ lang: 'tsx', code: MinIconFontUsageSnippet })}>
                show code
              </Button>
            </View>
          </View>
        </View>
      </Layout>
    </>
  )
}

definePageConfig({
  navigationBarTitleText: 'MinIcon',
})
