import { IModal, Modal } from '@min-kit/components'
import { toast } from '@min-kit/extends'
import { Button, View } from '@tarojs/components'

import defineDemo from './define'

export default defineDemo<Partial<IModal.ContainerProps>, { subtitle?: string; Component: React.FC }>({
  title: 'Modal.with',
  subtitle: `参数说明：
    displayName: 组件名称
    Component: 组件
    defaultProps?: 默认参数`,
  propType: `export namespace IModal {
  export type Props<OwnProps = {}, TOk = any, TCancel = any> = {
    className?: string
    children?: React.ReactNode
    onOk?(e: TOk): void
    onCancel?(e: TCancel): void
  } & OwnProps

  export type Result<TOk = any, TCancel = any> =
    | { ok: true; detail: TOk }
    | { ok: false; detail: TCancel | 'backdrop' | 'unmount' }

  export interface Task<TOk = any, TCancel = any>
    extends Promise<Result<TOk, TCancel>> {
    unmount(): boolean
  }

  export interface DrawerProps {
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
     * 默认值见配置 {@link MinDrawer.defaults.offsetY}
     */
    offsetY?: number
    /** 点击背景关闭事件 */
    onClose?(): void
  }

  export type ContainerProps = Pick<
    DrawerProps,
    | 'position'
    | 'backdropCloseable'
    | 'zIndex'
    | 'duration'
    | 'offsetX'
    | 'offsetY'
  > & {
    /** Specify className of the container (Drawer) */
    containerClass?: string
  }
}

type WithOpenProps<T> = IModal.ContainerProps & T
type OpenProps<T> = Omit<WithOpenProps<T>, 'onOk' | 'onCancel'>

// declare Modal.with
declare function withOpen<
  OwnProps,
  TOk = any,
  TCancel = any,
  TModalProps extends IModal.Props = IModal.Props<OwnProps, TOk, TCancel>
>(
  displayName: string,
  Component: React.FC<TModalProps>,
  defaultProps?: IModal.ContainerProps
): (props?: OpenProps<TModalProps>) => IModal.Task<TOk, TCancel>

`,
  demos: [
    {
      title: '基础用法',
      subtitle: '更多参数见Props',
      label: 'show Modal',
      Component: ({ content, onOk, onCancel }: any) => (
        <View className='p-10 bg-white text-center'>
          <View>MyModal 弹窗</View>
          <View className='my-2 text-sm'>{content}</View>
          <Button className='mr-2' type='primary' size='mini' onClick={() => onOk?.('yes')}>
            确认
          </Button>
          <Button size='mini' plain onClick={() => onCancel?.('no')}>
            关闭
          </Button>
        </View>
      ),
      props: {},
      snippet: ` // pages/index/index.tsx
import { Modal } from '@min-kit/components'
import { toast } from '@min-kit/extends'
import { Button, View } from '@tarojs/components'

const modal = Modal.with<{ content: string }, 'yes', 'no'>('MyModal', ({ content, onOk, onCancel }) => {
  return (
    <View className='p-10 bg-white text-center'>
      <View>MyModal 弹窗</View>
      <View className='my-2 text-sm'>{content}</View>
      <Button className='mr-2' type='primary' size='mini' onClick={() => onOk?.('yes')}>
        确认
      </Button>
      <Button size='mini' plain onClick={() => onCancel?.('no')}>
        关闭
      </Button>
    </View>
  )
})

export default function Index() {
  return (
    <View>
      <Button onClick={() => modal({ content: 'Sure?' }).then((res) => toast(JSON.stringify(res)))}>Open Modal</Button>
    </View>
  )
}

`,
    },
    {
      title: '设置默认属性',
      subtitle: '默认属性为 `Modal.with` 第三个参数',
      label: 'show Modal',
      Component: ({ content, onOk, onCancel }: any) => (
        <View className='p-10 bg-white text-center'>
          <View>MyModal 弹窗</View>
          <View className='my-2 text-sm'>{content}</View>
          <Button className='mr-2' type='primary' size='mini' onClick={() => onOk?.('yes')}>
            确认
          </Button>
          <Button size='mini' plain onClick={() => onCancel?.('no')}>
            关闭
          </Button>
        </View>
      ),
      props: { backdropCloseable: true, position: 'bottom', offsetY: 88, duration: 750 },
      snippet: ` // pages/index/index.tsx
import { Modal } from '@min-kit/components'
import { toast } from '@min-kit/extends'
import { Button, View } from '@tarojs/components'

const modal = Modal.with<{ content: string }, 'yes', 'no'>(
  'MyModal',
  ({ content, onOk, onCancel }) => {
    return (
      <View className='p-10 bg-white text-center'>
        <View>MyModal 弹窗</View>
        <View className='my-2 text-sm'>{content}</View>
        <Button className='mr-2' type='primary' size='mini' onClick={() => onOk?.('yes')}>
          确认
        </Button>
        <Button size='mini' plain onClick={() => onCancel?.('no')}>
          关闭
        </Button>
      </View>
    )
  },
  // 设置默认属性
  { backdropCloseable: true, position: 'bottom', offsetY: 88, duration: 750 },
)

export default function Index() {
  return (
    <View>
      <Button onClick={() => modal({ content: 'Sure?' }).then((res) => toast(JSON.stringify(res)))}>Open Modal</Button>
    </View>
  )
}

`,
    },
  ],
  async invoke(config) {
    const modal = Modal.with('ModalComponent', config.Component, config.props)
    toast(JSON.stringify(await modal()))
  },
})
