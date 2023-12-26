import { MinIcon, Modal } from '@min-kit/components'
import { toast } from '@min-kit/extends'
import { sleep } from '@min-kit/shared'
import { View } from '@tarojs/components'

import defineDemo from './define'

export default defineDemo<Partial<Parameters<typeof Modal.confirm>[0]>, { autoClose?: number; subtitle?: string }>({
  title: 'Modal.confirm',
  subtitle: 'API方式异步调用 confirm 模态对话框，类似wx.showModal',
  propType: `// defined: IModal.ConfirmProps
interface ConfirmProps {
  icon?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  okText: ReactNode
  cancelText?: ReactNode
  buttonInline?: boolean
  footer?: ReactNode
  /** @default true */
  divider?: boolean
  /** @default true when unset cancelText either */
  closeable?: boolean
  userSelect?: boolean
}

`,
  demos: [
    {
      title: '基础用法',
      label: 'Open Modal',
      subtitle: '用户点击反馈按钮后关闭Modal并返回结果\n调用时确认按钮文案(okText)为必填，其余参数可选',
      props: {
        title: '对不起，您所拔打的电话\n正在通话中，请稍后再拨',
        subtitle: 'Sorry! The subscriber you dialed\n is busy now, please redial later.',
        okText: '知道了',
        footer: '您所拔打的电话正在通话中，请稍后再拨\nThe subscriber you dialed is busy now.',
      },
      snippet: `import { Modal } from '@min-kit/components'

const { ok } = await Modal.confirm({
  title: '对不起，您所拔打的电话\\n正在通话中，请稍后再拨',
  subtitle: 'Sorry! The subscriber you dialed\\n is busy now, please redial later.',
  okText: '知道了',
  footer: '您所拔打的电话正在通话中，请稍后再拨\\nThe subscriber you dialed is busy now.',
})

if (ok) {
  // ok button clicked
}
`,
    },
    {
      title: '设置取消按钮',
      label: 'Open Modal',
      subtitle: '设置`cancelText`即可',
      props: {
        title: '设置取消按钮',
        subtitle: '设置`cancelText`即可',
        okText: '确认',
        cancelText: '取消',
      },
      snippet: `import { Modal } from '@min-kit/components'

const { ok } = await Modal.confirm({
  title: '设置取消按钮',
  subtitle: '设置\`cancelText\`即可',
  okText: '确认',
  cancelText: '取消',
})

if (ok) {
  // ok button clicked
} else {
  // cancel button clicked
}
`,
    },
    {
      title: '设置按钮inline布局',
      label: 'Open Modal',
      subtitle: '必须同时设置`cancelText` & `buttonInline: true`',
      props: {
        title: '设置按钮inline布局',
        subtitle: '必须同时设置`cancelText` & `buttonInline: true`',
        okText: '确认',
        cancelText: '取消',
        buttonInline: true,
      },
      snippet: `import { Modal } from '@min-kit/components'

Modal.confirm({
  title: '设置按钮inline布局',
  subtitle: '必须同时设置\`cancelText\` & \`buttonInline: true\`',
  okText: '确认',
  cancelText: '取消',
  buttonInline: true,
})
`,
    },
    {
      title: '设置底部关闭图标',
      subtitle: '设置`closeable: true`\n默认情况下自动开启，若有取消按钮(`cancelText`)时关闭',
      label: 'Open Modal',
      props: {
        title: '设置底部关闭图标',
        subtitle:
          '设置`closeable: true`\n默认情况下自动开启，若有取消按钮(`cancelText`)时关闭\n判断取消结果来源请看代码',
        okText: '确认',
        cancelText: '取消',
        closeable: true,
      },
      snippet: `import { Modal } from '@min-kit/components'

const res = await Modal.confirm({
  title: '设置底部关闭图标',
  subtitle: '设置\`closeable: true\`\\n默认情况下自动开启，若有取消按钮(\`cancelText\`)时关闭\\n判断取消结果来源请看代码',
  okText: '确认',
  cancelText: '取消',
  closeable: true, // enable close in bottom
})

if (res.ok) {
  // ok button clicked
} else if (res.detail === 'cancel') {
  // cancel button clicked
} else if (res.detail === 'close') {
  // close icon clicked
}
`,
    },
    {
      title: '设置点击背景关闭',
      subtitle: '设置`backdropCloseable: true`',
      label: 'Open Modal',
      props: {
        title: '设置点击背景关闭',
        subtitle: '设置`closeable: true`。\n判断取消结果来源请看代码',
        okText: '确认',
        backdropCloseable: true,
      },
      snippet: `import { Modal } from '@min-kit/components'

const res = await Modal.confirm({
  title: '设置点击背景关闭',
  subtitle: '设置\`closeable: true\`\\n判断取消结果来源请看代码',
  okText: '确认',
  backdropCloseable: true,
})

if (res.detail === 'backdrop') {
  // backdrop clicked
}
`,
    },
    {
      title: '自定义弹窗内容',
      subtitle: '`title, subtitle, footer, okText, cancelText`都支持自定义 JSX 片段',
      label: 'Open Modal',
      props: {
        title: <View className='text-pink-600'>自定义弹窗标题</View>,
        subtitle: (
          <View className='text-left'>
            左对齐：自定义弹窗内容自定义弹窗内容自定义弹窗内容自定义弹窗内容自定义弹窗内容自定义弹窗内容
            <MinIcon className='block' name='react' />
          </View>
        ),
        okText: (
          <View className='flex-center w-full h-full bg-red-500'>
            <MinIcon className='mr-1' name='check' size={16} />
            确认
          </View>
        ),
        cancelText: (
          <View className='flex-center'>
            <MinIcon className='mr-1 invert' name='close' size={16} />
            取消
          </View>
        ),
        buttonInline: true,
      },
      snippet: `import { MinIcon, Modal } from '@min-kit/components'
import { View } from '@tarojs/components'

const res = await Modal.confirm({
  title: <View className='text-pink-600'>自定义弹窗标题</View>,
  subtitle: (
    <View className='text-left'>
      左对齐：自定义弹窗内容自定义弹窗内容自定义弹窗内容自定义弹窗内容自定义弹窗内容自定义弹窗内容
      <MinIcon className='block' name='react' />
    </View>
  ),
  okText: (
    <View className='flex-center w-full h-full bg-red-500'>
      <MinIcon className='mr-1' name='check' size={16} />
      确认
    </View>
  ),
  cancelText: (
    <View className='flex-center'>
      <MinIcon className='mr-1 invert' name='close' size={16} />
      取消
    </View>
  ),
  buttonInline: true,
})

`,
    },
  ],
  async invoke(config) {
    const modal = Modal.confirm({
      okText: '知道了',
      title: config.title,
      ...config.props,
    })

    if (config.autoClose) {
      sleep(config.autoClose).then(() => modal.unmount())
    }

    toast(JSON.stringify(await modal))
  },
})
