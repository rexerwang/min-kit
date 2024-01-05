import { View } from '@tarojs/components'

import MinCode from '@/components/code'

import { Counter } from './demo/counter'
import { UsageSnippet } from './demo/snippets'

export default function Index() {
  return (
    <View className='relative box-border'>
      <View className='flex-center my-4'>
        <Counter />
      </View>
      <MinCode.Layout title='Counter.tsx' lang='tsx'>
        {UsageSnippet}
      </MinCode.Layout>
    </View>
  )
}

definePageConfig({
  navigationBarTitleText: 'store',
})
