import { MinIcon } from '@min-kit/components'
import { copy } from '@min-kit/extends'
import { View } from '@tarojs/components'

import MinCode from '@/components/code'
import Layout from '@/components/layout'

// pages/index/index.tsx
export default function Index() {
  return (
    <>
      <Layout title='MinIcon'>
        <View className='grid grid-cols-4 gap-4'>
          {Object.keys(MinIcon.configs).map((name) => (
            <View key={name} className='flex-center flex-col'>
              <View className='p-1 rounded' hoverClass='bg-gray-900' onClick={() => copy(`<MinIcon name='${name}' />`)}>
                <MinIcon name={name} size={32} />
              </View>
              <View className='text-xs'>{name}</View>
            </View>
          ))}
        </View>
      </Layout>

      <MinCode.Layout className='mt-4' lang='tsx'>{` // load icons at first
MinIcon.load({
  'react': require('./react.svg')
})

<MinIcon name='react' />`}</MinCode.Layout>
    </>
  )
}

definePageConfig({
  navigationBarTitleText: 'MinIcon',
})
