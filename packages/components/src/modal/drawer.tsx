import { hasNavBar, hasTabBar, SystemInfo } from '@min-kit/extends'
import { MIN_Z_DEPTH, px } from '@min-kit/shared'
import { View } from '@tarojs/components'
import clsx from 'clsx'
import { useMemo } from 'react'

import type { IModal } from './types'

export default function Drawer({
  className,
  position = 'center',
  backdropCloseable = false,
  zIndex = MIN_Z_DEPTH,
  duration = 300,
  offsetX,
  offsetY,
  children,
  onClose,
}: IModal.DrawerProps) {
  const style: React.CSSProperties = useMemo(() => {
    let _offsetY = 0
    switch (position) {
      case 'center':
        _offsetY = offsetY ?? Drawer.defaults.offsetY.center
        break

      case 'top':
        const safeAreaTop = hasNavBar() ? 0 : SystemInfo.menuButtonRect.bottom ?? 80
        _offsetY = (offsetY ?? Drawer.defaults.offsetY.top) + safeAreaTop
        break

      case 'bottom':
        const safeAreaBottom = hasTabBar() ? 0 : SystemInfo.screenHeight - SystemInfo.safeArea.bottom
        _offsetY = (offsetY ?? Drawer.defaults.offsetY.bottom) + safeAreaBottom
        break
    }

    return {
      zIndex,
      '--duration': duration + 'ms',
      '--offsetX': px(offsetX ?? 0),
      '--offsetY': px(_offsetY),
    }
  }, [zIndex, duration, offsetX, offsetY, position])

  return (
    <View
      style={style}
      className={clsx('min-drawer', position, className)}
      onClick={backdropCloseable ? onClose : undefined}>
      <View
        className='min-drawer-body'
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}>
        {children}
      </View>
    </View>
  )
}

Drawer.defaults = {
  offsetY: {
    center: -96,
    top: 32,
    bottom: 0,
  },
}

Drawer.displayName = 'MinDrawer'
