import { MinIcon, MinNavigationBar } from '@min-kit/components'
import { View } from '@tarojs/components'

import MinCode from '@/components/code'

export default function Index() {
  return (
    <>
      <MinNavigationBar
        title={
          <View className='flex-center-y'>
            <MinIcon name='success' size={24} />
            <View className='ml-2 text-sm'>自定义导航栏</View>
          </View>
        }>
        <View className='ml-2 text-gray-400 text-2xs'>* defined with MinNavigationBar</View>
      </MinNavigationBar>

      <MinCode.Layout className='mt-4' lang='tsx'>
        {`<MinNavigationBar
  title={
    <View className='flex-center-y'>
      <MinIcon name='success' size={24} />
      <View className='ml-2 text-sm'>自定义导航栏</View>
    </View>
  }>
  <View className='ml-2 text-gray-400 text-2xs'>* defined with MinNavigationBar</View>
</MinNavigationBar>`}
      </MinCode.Layout>
    </>
  )
}

definePageConfig({
  navigationStyle: 'custom',
})
