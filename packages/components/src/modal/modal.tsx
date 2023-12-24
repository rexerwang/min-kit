import { getZDepth } from '@min-kit/shared'

import { mountPortal } from '../portal'
import { MinDrawer, MinDrawerProps } from './drawer'

export type ModalProps<Props = {}, TOk = any, TCancel = any> = {
  className?: string
  children?: React.ReactNode
  onOk?(e: TOk): void
  onCancel?(e: TCancel): void
} & Props

export type ModalResult<TOk = any, TCancel = any> =
  | { ok: true; detail: TOk }
  | { ok: false; detail: TCancel | 'backdrop' | 'unmount' }

export interface ModalTask<TOk = any, TCancel = any> extends Promise<ModalResult<TOk, TCancel>> {
  unmount(): boolean
}

type ContainerProps = Pick<
  MinDrawerProps,
  'position' | 'backdropCloseable' | 'zIndex' | 'duration' | 'offsetX' | 'offsetY'
> & {
  /** Specify className of the container (Drawer) */
  containerClass?: string
}

type OpenProps<T> = ContainerProps & T

type OwnOpenProps<T> = Omit<OpenProps<T>, 'onOk' | 'onCancel'>

function withOpen<
  OwnProps,
  TOk = any,
  TCancel = any,
  TModalProps extends ModalProps = ModalProps<OwnProps, TOk, TCancel>,
>(displayName: string, Component: React.FC<TModalProps>, defaultProps?: ContainerProps) {
  const noop = () => false

  return (props = {} as OwnOpenProps<TModalProps>): ModalTask<TOk, TCancel> => {
    let doUnmount = noop

    const promise = new Promise<ModalResult<TOk, TCancel>>((resolve, reject) => {
      let unmount = noop

      const { position, backdropCloseable, zIndex, duration, offsetX, offsetY, containerClass, ...contentProps } = {
        ...defaultProps,
        ...props,
        onOk: (e) => {
          resolve({ ok: true, detail: e })
          unmount()
        },
        onCancel: (e) => {
          resolve({ ok: false, detail: e })
          unmount()
        },
      } as OpenProps<TModalProps>

      const zDepth = zIndex || getZDepth()

      try {
        unmount = mountPortal(
          () => (
            <MinDrawer
              onClose={() => contentProps.onCancel?.('backdrop')}
              position={position}
              backdropCloseable={backdropCloseable}
              zIndex={zDepth}
              duration={duration}
              offsetX={offsetX}
              offsetY={offsetY}
              className={containerClass}>
              <Component {...(contentProps as TModalProps)} />
            </MinDrawer>
          ),
          {},
          displayName,
        )

        doUnmount = () => {
          if (unmount()) {
            resolve({ ok: false, detail: 'unmount' })
            return true
          }
          return false
        }
      } catch (error) {
        reject(error)
      }
    })

    return Object.assign(promise, { unmount: doUnmount })
  }
}

export const Modal = Object.assign(MinDrawer, { with: withOpen })
