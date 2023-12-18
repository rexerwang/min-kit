import { document, getRootElement, logger } from '@miniapp/extends'
import { RootPortal, View } from '@tarojs/components'
import { render, unmountComponentAtNode } from '@tarojs/react'
import { canIUse } from '@tarojs/taro'

import type { FC } from 'react'

const Portal = canIUse('root-portal') ? RootPortal : View

let n = 0

/**
 * createPortal for current page instance
 * @returns unmount
 * @throws if not found page instance
 */
export function mountPortal<T extends object>(Component: FC<T>, props: T = {} as T, displayName?: string) {
  const meta = {
    n: ++n,
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

  render(
    <Portal id={'portal-' + n} className='portal'>
      <Component {...props} />
    </Portal>,
    el,
  )

  root.appendChild(el)
  logger.debug('#mountPortal', 'Mount', meta)

  return () => {
    try {
      unmountComponentAtNode(el)
      root.removeChild(el)
      logger.debug('#mountPortal', 'Unmount', meta)
      return true
    } catch (error) {
      logger.error('#mountPortal', 'Unmount', meta, error)
      return false
    }
  }
}
