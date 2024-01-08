import { getZDepth } from '@min-kit/shared'

import { mountPortal, UnmountPortal } from '../portal'
import Drawer from './drawer'
import { IModal } from './types'

type WithOpenProps<T> = IModal.ContainerProps & T
type OpenProps<T> = Omit<WithOpenProps<T>, 'onOk' | 'onCancel'>

const noop: UnmountPortal = Object.assign(() => false, { id: '' })

export function withOpen<
  OwnProps,
  TOk = any,
  TCancel = any,
  TModalProps extends IModal.Props = IModal.Props<OwnProps, TOk, TCancel>,
>(displayName: string, Component: React.FC<TModalProps>, defaultProps?: IModal.ContainerProps) {
  return (props = {} as OpenProps<TModalProps>): IModal.Task<TOk, TCancel> => {
    let unmount = noop

    const promise = new Promise<IModal.Result<TOk, TCancel>>((resolve, reject) => {
      let unmountPortal = noop

      const { position, backdropCloseable, zIndex, duration, offsetX, offsetY, containerClass, ...contentProps } = {
        ...defaultProps,
        ...props,
        onOk: (e) => {
          resolve({ ok: true, detail: e })
          unmountPortal()
        },
        onCancel: (e) => {
          resolve({ ok: false, detail: e })
          unmountPortal()
        },
      } as WithOpenProps<TModalProps>

      const zDepth = zIndex || getZDepth()

      try {
        unmountPortal = mountPortal(
          () => (
            <Drawer
              onClose={() => contentProps.onCancel?.('backdrop')}
              position={position}
              backdropCloseable={backdropCloseable}
              zIndex={zDepth}
              duration={duration}
              offsetX={offsetX}
              offsetY={offsetY}
              className={containerClass}>
              <Component {...(contentProps as TModalProps)} />
            </Drawer>
          ),
          {},
          displayName,
        )

        unmount = Object.assign(
          () => {
            if (unmountPortal()) {
              resolve({ ok: false, detail: 'unmount' })
              return true
            }
            return false
          },
          { id: unmountPortal.id },
        )
      } catch (error) {
        reject(error)
      }
    })

    return Object.assign(promise, { unmount })
  }
}
