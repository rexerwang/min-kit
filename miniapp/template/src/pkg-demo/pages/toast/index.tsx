import { toast } from '@min-kit/extends'
import { sleep } from '@min-kit/shared'
import { Button, View } from '@tarojs/components'

import Layout from '@/pkg-demo/shared/components/layout'

export default function Index() {
  return (
    <Layout title='toast'>
      <View className='mb-4'>
        <View className='text-gray-500'>轻提示</View>
        <View>
          <Button
            className='btn mt-2 px-4 py-2.5 text-left font-semibold leading-none text-black bg-white rounded-full'
            hoverClass='shadow'
            onClick={() => toast('轻提示：不显示图标时文本最多可显示两行')}>
            toast(&apos;...&apos;)
          </Button>
          <Button
            className='btn mt-2 px-4 py-2.5 text-left font-semibold leading-none text-black bg-white rounded-full'
            hoverClass='shadow'
            onClick={() => {
              toast.loading()
              sleep(3000).then(toast.clear)
            }}>
            toast.loading()
          </Button>
          <Button
            className='btn mt-2 px-4 py-2.5 text-left font-semibold leading-none text-black bg-white rounded-full'
            hoverClass='shadow'
            onClick={() => toast.success()}>
            toast.success()
          </Button>
          <Button
            className='btn mt-2 px-4 py-2.5 text-left font-semibold leading-none text-black bg-white rounded-full'
            hoverClass='shadow'
            onClick={() => toast.error()}>
            toast.error()
          </Button>
        </View>
      </View>
    </Layout>
  )
}

definePageConfig({
  navigationBarTitleText: 'toast组件',
})
