import { getZDepth } from '@min-kit/shared'

import { mountPortal } from '../portal'
import Drawer from './drawer'
import { IModal } from './types'

type WithOpenProps<T> = IModal.ContainerProps & T
type OpenProps<T> = Omit<WithOpenProps<T>, 'onOk' | 'onCancel'>

export function withOpen<
  OwnProps,
  TOk = any,
  TCancel = any,
  TModalProps extends IModal.Props = IModal.Props<OwnProps, TOk, TCancel>,
>(displayName: string, Component: React.FC<TModalProps>, defaultProps?: IModal.ContainerProps) {
  const noop = () => false

  return (props = {} as OpenProps<TModalProps>): IModal.Task<TOk, TCancel> => {
    let doUnmount = noop

    const promise = new Promise<IModal.Result<TOk, TCancel>>((resolve, reject) => {
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
      } as WithOpenProps<TModalProps>

      const zDepth = zIndex || getZDepth()

      try {
        unmount = mountPortal(
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
