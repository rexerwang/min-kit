export namespace IModal {
  export type Props<OwnProps = {}, TOk = any, TCancel = any> = {
    className?: string
    children?: React.ReactNode
    onOk?(e: TOk): void
    onCancel?(e: TCancel): void
  } & OwnProps

  export type Result<TOk = any, TCancel = any> =
    | { ok: true; detail: TOk }
    | { ok: false; detail: TCancel | 'backdrop' | 'unmount' }

  export interface Task<TOk = any, TCancel = any> extends Promise<Result<TOk, TCancel>> {
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
     * X轴偏移量 相对`position`方向
     * @default 0
     */
    offsetX?: number
    /***
     * Y轴偏移量 相对`position`方向
     *
     * 默认值见配置 {@link Modal.defaults.offsetY}
     */
    offsetY?: number
    /** 点击背景关闭事件 */
    onClose?(): void
  }

  export type ContainerProps = Pick<
    DrawerProps,
    'position' | 'backdropCloseable' | 'zIndex' | 'duration' | 'offsetX' | 'offsetY'
  > & {
    /** Specify className of the container (Drawer) */
    containerClass?: string
  }

  export interface ConfirmProps {
    icon?: React.ReactNode
    title?: React.ReactNode
    subtitle?: React.ReactNode
    okText: React.ReactNode
    cancelText?: React.ReactNode
    buttonInline?: boolean
    footer?: React.ReactNode
    /** @default true */
    divider?: boolean
    /** @default true when unset `cancelText` either */
    closeable?: boolean
    userSelect?: boolean
  }
}
