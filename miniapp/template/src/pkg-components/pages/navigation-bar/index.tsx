import { MinIcon, MinNavigationBar } from '@min-kit/components'
import { go } from '@min-kit/extends'
import { View } from '@tarojs/components'

import { Pages } from '@/app.route'
import MinCode from '@/components/code'

export default function Index() {
  return (
    <>
      <MinNavigationBar
        title={
          <View className='flex-center-y'>
            <MinIcon name='back' size={20} onClick={() => go.back(Pages.PkgComponents.Index)} />
            <MinIcon className='ml-2' name='success' size={24} />
            <View className='text-sm'>自定义导航栏</View>
          </View>
        }>
        <View className='ml-2 text-gray-400 text-2xs'>* defined with MinNavigationBar</View>
      </MinNavigationBar>

      <MinCode.Layout className='mt-4' lang='tsx'>
        {`<MinNavigationBar
  title={
    <View className='flex-center-y'>
      <MinIcon name='back' size={20} onClick={() => go.back(Pages.PkgComponents.Index)} />
      <MinIcon className='ml-2' name='success' size={24} />
      <View className='text-sm'>自定义导航栏</View>
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
