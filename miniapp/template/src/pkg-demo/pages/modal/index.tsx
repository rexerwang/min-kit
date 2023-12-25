import { MinText } from '@min-kit/components'
import { Button, View } from '@tarojs/components'

import MinCode from '@/components/code'
import Layout from '@/pkg-demo/components/layout'

import demos from './demos'

export default function Index() {
  return (
    <>
      <Layout title='Modal 模态框组件'>
        <View className='mb-2 text-xs text-gray-400 break-all'>
          <MinText>
            {
              '组件引用方式：\n- 组件引用 👉 `<Modal />`\n- API方式 👉 `Modal.with()()` \n- 确认弹窗 👉 `Modal.confirm()`'
            }
          </MinText>
        </View>
        {demos.map((demo) => (
          <View key={demo.title} className='mb-4'>
            <View className='flex-center-y'>
              <View className='font-semibold'>{demo.title}</View>
              <View className='flex-1 h-[1px] mx-4 border-b border-dashed border-gray-400'></View>
              <View
                className='w-fit text-xs leading-none text-black underline underline-offset-2'
                onClick={() => MinCode.popup({ title: 'Props', lang: 'd.ts', code: demo.propType })}>
                Props
              </View>
            </View>

            {demo.subtitle && (
              <View className='my-1 text-xs text-gray-400 break-all'>
                <MinText>{demo.subtitle}</MinText>
              </View>
            )}

            {demo.demos.map((i) => (
              <View key={i.title} className='mt-3 p-3 bg-white rounded-lg'>
                <View>{i.title}</View>
                {i.subtitle && (
                  <View className='my-1 text-xs text-gray-400 break-all'>
                    <MinText>{i.subtitle}</MinText>
                  </View>
                )}
                <View className='mt-2 grid grid-cols-2 gap-2'>
                  <Button
                    className='btn px-2.5 py-1.5 flex-center text-xs text-white bg-black rounded-lg'
                    hoverClass='brightness-90'
                    onClick={() => demo.invoke(i)}>
                    {i.label ?? 'example'}
                  </Button>
                  <Button
                    className='btn px-2.5 py-1.5 flex-center text-xs text-black bg-white border border-solid border-black rounded-lg'
                    hoverClass='brightness-90'
                    onClick={() => MinCode.popup({ title: i.title, lang: 'tsx', code: i.snippet })}>
                    Show code
                  </Button>
                </View>
              </View>
            ))}
          </View>
        ))}
      </Layout>
    </>
  )
}

definePageConfig({
  navigationBarTitleText: 'Modal组件',
})
