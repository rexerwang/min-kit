import MinCode from '@/components/code'
import Layout from '@/components/layout'

export default function Index() {
  return (
    <>
      <Layout />
      <MinCode.Layout className='mt-2' title='组件样式引入'>{` // src/app.ts

// 整体引入
import '@min-kit/components/dist/styles/index.css'

// 按需引入
import '@min-kit/components/dist/styles/min-debugger.css'
import '@min-kit/components/dist/styles/min-icon.css'
import '@min-kit/components/dist/styles/min-image.css'
import '@min-kit/components/dist/styles/min-navigation-bar.css'
import '@min-kit/components/dist/styles/modal.css'

// 引入SCSS
import '@min-kit/components/styles/index.scss'
import '@min-kit/components/styles/min-debugger.scss'
import '@min-kit/components/styles/min-icon.scss'
import '@min-kit/components/styles/min-image.scss'
import '@min-kit/components/styles/min-navigation-bar.scss'
import '@min-kit/components/styles/modal.scss'

`}</MinCode.Layout>
    </>
  )
}

definePageConfig({
  navigationBarTitleText: 'components',
})
