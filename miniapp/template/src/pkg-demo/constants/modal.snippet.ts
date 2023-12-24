export const MODAL_PROPS_SNIPPET = `interface ConfirmModalProps {
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
   * X轴偏移量 相对 position 方向
   * @default 0
   */
  offsetX?: number
  /***
   * Y轴偏移量 相对 position 方向
   *
   * 默认值见配置 {@link Drawer.defaults.offsetY}
   */
  offsetY?: number
  /** 点击背景关闭事件 */
  onClose?(): void
}
`

export const MODAL_USAGE_SNIPPET = `import { confirmModal } from '@min-kit/components'

const { ok, detail } = await confirmModal({
  title: '对不起，您所拔打的电话\\n正在通话中，请稍后再拨',
  subtitle: 'Sorry! The subscriber you dialed\\n is busy now, please redial later.',
  okText: '知道了',
  footer: '您所拔打的电话正在通话中，请稍后再拨\\nThe subscriber you dialed is busy now.',
})

if (ok) {
  // ok button clicked
}
`
