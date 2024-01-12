import { MinImage } from '@min-kit/components'

import MinCode from '@/components/code'
import Layout from '@/components/layout'

// pages/index/index.tsx
export default function Index() {
  return (
    <>
      <Layout title='MinImage'>
        <MinImage
          className='w-full'
          mode='widthFix'
          src='https://source.unsplash.com/random/400x400?nature'
          preview={[
            'https://source.unsplash.com/random/400x400?nature',
            'https://source.unsplash.com/random/400x400?people',
            'https://source.unsplash.com/random/400x400?foods',
          ]}
        />
      </Layout>

      <MinCode.Layout className='mt-4' lang='tsx'>{`<MinImage
  className='w-full'
  mode='widthFix'
  src='https://source.unsplash.com/random/400x400?nature'
  preview={[
    'https://source.unsplash.com/random/400x400?nature',
    'https://source.unsplash.com/random/400x400?people',
    'https://source.unsplash.com/random/400x400?foods',
  ]}
/>
`}</MinCode.Layout>
    </>
  )
}

definePageConfig({
  navigationBarTitleText: 'MinImage',
})
