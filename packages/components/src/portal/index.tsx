import { document, getRootElement, logger } from '@min-kit/extends'
import { RootPortal, View } from '@tarojs/components'
import { render, unmountComponentAtNode } from '@tarojs/react'
import { canIUse } from '@tarojs/taro'

const Portal = canIUse('root-portal') ? RootPortal : View

let n = 0

export type UnmountPortal = {
  (): boolean
  id: string
}

/**
 * mount Portal on current page instance
 * @throws if not found page instance
 */
export function mountPortal<T extends object>(Component: React.FC<T>, props: T = {} as T, displayName?: string) {
  const meta = {
    id: '',
    name: displayName ?? Component.displayName ?? Component.name,
    props,
  }

  const root = getRootElement()

  if (!root) {
    const error = new Error('Not found page instance')
    logger.error('#mountPortal', 'Mount', error, meta)
    throw error
  }

  const el = document.createElement('block')
  const id = 'min-portal-' + ++n

  meta.id = id

  render(
    <Portal id={id} className='min-portal'>
      <Component {...props} />
    </Portal>,
    el,
  )

  root.appendChild(el)
  logger.debug('#mountPortal', 'Mount', meta)

  const unmount: UnmountPortal = () => {
    try {
      unmountComponentAtNode(el)
      root.removeChild(el)
      logger.debug('#mountPortal', 'Unmount', meta)
      return true
    } catch (error) {
      logger.error('#mountPortal', 'Unmount', error, meta)
      return false
    }
  }
  unmount.id = id
  return unmount
}
