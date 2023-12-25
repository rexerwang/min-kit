import { IModal, Modal } from '@min-kit/components'
import { toast } from '@min-kit/extends'
import { sleep } from '@min-kit/shared'
import { View } from '@tarojs/components'

import defineDemo from './define'

export default defineDemo<Partial<IModal.DrawerProps>, { subtitle?: string; autoClose?: number }>({
  title: '<Modal />',
  subtitle: '',
  propType: `// defined: IModal.DrawerProps
interface DrawerProps {
  className?: string
  /** 弹出位置 @default 'center' */
  position?: 'center' | 'top' | 'bottom'
  zIndex?: number
  /** 动画时长，单位毫秒  @default 300 */
  duration?: number
  children?: React.ReactNode
  /** 点击背景关闭 @default false */
  backdropCloseable?: boolean
  /**
   * X轴偏移量 相对\`position\`方向
   * @default 0
   */
  offsetX?: number
  /***
   * Y轴偏移量 相对\`position\`方向
   *
   * 默认值见配置 {@link Modal.defaults.offsetY}
   */
  offsetY?: number
  /** 点击背景关闭事件 */
  onClose?(): void
}
`,
  demos: [
    {
      title: '基础用法',
      subtitle: '具体属性参见Props',
      label: 'Open Modal',
      props: {
        children: <View className='p-10 bg-white'>弹窗内容</View>,
        backdropCloseable: true,
      },
      snippet: ` // pages/index/index.tsx
import { Modal } from '@min-kit/components'
import { Button, View } from '@tarojs/components'
import { useState } from 'react'

export default function Index() {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>

      {visible && (
        <Modal onClose={() => setVisible(false)} backdropCloseable>
          <View className='p-10 bg-white'>弹窗内容</View>
        </Modal>
      )}
    </View>
  )
}

`,
    },
    {
      title: '设置弹出位置 - top',
      subtitle: '`position`: "center" | "top" | "bottom"\n默认为"center"',
      label: 'top',
      props: {
        children: <View className='p-10 bg-white'>弹窗内容</View>,
        position: 'top',
        backdropCloseable: true,
      },
      snippet: ` // pages/index/index.tsx
import { Modal } from '@min-kit/components'
import { Button, View } from '@tarojs/components'
import { useState } from 'react'

export default function Index() {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>

      {visible && (
        <Modal position='top' backdropCloseable onClose={() => setVisible(false)}>
          <View className='p-10 bg-white'>弹窗内容</View>
        </Modal>
      )}
    </View>
  )
}

`,
    },
    {
      title: '设置弹出位置 - bottom',
      subtitle: '`position`: "center" | "top" | "bottom"\n默认为"center"',
      label: 'bottom',
      props: {
        children: <View className='p-10 bg-white'>弹窗内容</View>,
        position: 'bottom',
        backdropCloseable: true,
      },
      snippet: ` // pages/index/index.tsx
import { Modal } from '@min-kit/components'
import { Button, View } from '@tarojs/components'
import { useState } from 'react'

export default function Index() {
  const [visible, setVisible] = useState(false)

  return (
    <View>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>

      {visible && (
        <Modal position='bottom' backdropCloseable onClose={() => setVisible(false)}>
          <View className='p-10 bg-white'>弹窗内容</View>
        </Modal>
      )}
    </View>
  )
}

`,
    },
  ],
  async invoke(config) {
    const { children, ...props } = config.props
    const showModal = Modal.with('ModalComponent', () => children)
    const modal = showModal(props)

    if (config.autoClose) {
      sleep(config.autoClose).then(() => modal.unmount())
    }

    toast(JSON.stringify(await modal))
  },
})
