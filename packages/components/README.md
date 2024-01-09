# @min-kit/components

[![](https://img.shields.io/codecov/c/github/rexerwang/min-kit?flag=components&style=for-the-badge)](https://codecov.io/gh/rexerwang/min-kit/flags)
[![](https://img.shields.io/npm/types/%40min-kit/components?style=for-the-badge)](https://github.com/rexerwang/min-kit/tree/main/packages/components)
[![](https://img.shields.io/npm/v/%40min-kit/components?style=for-the-badge)](https://npm.im/@min-kit/components)
[![](https://img.shields.io/badge/React-Tarojs-007ACC?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=20232A)](https://github.com/NervJS/taro)

React components for miniapp

## Usage

```tsx
import { MinIcon, MinImage, MinNavigationBar, Modal, type ReactProps } from '@min-kit/components'
import { go } from '@min-kit/extends'
import { Button, View } from '@tarojs/components'

// pages/index/index.tsx
export default function Index(props: ReactProps) {
  const openModal = () => {
    Modal.confirm({
      title: 'Confirm',
      subtitle: 'the subtitle\nsupport multiple lines.',
      okText: 'ok',
      cancelText: 'cancel',
    })
  }

  return (
    <View className='relative box-border'>
      <MinNavigationBar
        title={
          <View className='flex-center-y'>
            <MinIcon name='back' size={20} onClick={() => go.back()} />
            <View className='ml-3 text-sm'>@min-kit/components</View>
          </View>
        }></MinNavigationBar>

      <View className='flex flex-col items-center'>
        <MinImage
          className='w-[750px] h-[750px]'
          src='https://source.unsplash.com/random/400x400?nature'
          preview={[
            'https://source.unsplash.com/random/400x400?nature',
            'https://source.unsplash.com/random/400x400?people',
            'https://source.unsplash.com/random/400x400?foods',
          ]}
        />
        <Button className='mt-4' type='primary' size='mini' plain onClick={openModal}>
          open modal
        </Button>
      </View>
    </View>
  )
}

definePageConfig({
  navigationStyle: 'custom',
})
```

### Import styles

```js
// Import overall styles
import '@min-kit/components/dist/styles/index.css'

// Import individual component styles
import '@min-kit/components/dist/styles/min-debugger.css'
import '@min-kit/components/dist/styles/min-icon.css'
import '@min-kit/components/dist/styles/min-image.css'
import '@min-kit/components/dist/styles/min-navigation-bar.css'
import '@min-kit/components/dist/styles/modal.css'

// Import SCSS
import '@min-kit/components/styles/index.scss'
import '@min-kit/components/styles/min-debugger.scss'
import '@min-kit/components/styles/min-icon.scss'
import '@min-kit/components/styles/min-image.scss'
import '@min-kit/components/styles/min-navigation-bar.scss'
import '@min-kit/components/styles/modal.scss'
```

More usage examples 👉 https://github.com/rexerwang/min-kit/tree/main/packages/example
