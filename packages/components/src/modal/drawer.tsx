import { hasNavBar, hasTabBar, SystemInfo } from '@min-kit/extends'
import { MIN_Z_DEPTH, px } from '@min-kit/shared'
import { View } from '@tarojs/components'
import clsx from 'clsx'
import { type CSSProperties, useMemo } from 'react'

export interface MinDrawerProps {
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
   * 默认值见配置 {@link MinDrawer.defaults.offsetY}
   */
  offsetY?: number
  /** 点击背景关闭事件 */
  onClose?(): void
}

export function MinDrawer({
  className,
  position = 'center',
  backdropCloseable = false,
  zIndex = MIN_Z_DEPTH,
  duration = 300,
  offsetX,
  offsetY,
  children,
  onClose,
}: MinDrawerProps) {
  const style: CSSProperties = useMemo(() => {
    let _offsetY = 0 // offsetY !== undefined ? offsetY : position === 'center' ? -88 : position === 'top' ? 80 : 0
    switch (position) {
      case 'center':
        _offsetY = offsetY ?? MinDrawer.defaults.offsetY.center
        break

      case 'top':
        const safeAreaTop = hasNavBar() ? 0 : SystemInfo.menuButtonRect.bottom ?? 80
        _offsetY = (offsetY ?? MinDrawer.defaults.offsetY.top) + safeAreaTop
        break

      case 'bottom':
        const safeAreaBottom = hasTabBar() ? 0 : SystemInfo.screenHeight - SystemInfo.safeArea.bottom
        _offsetY = (offsetY ?? MinDrawer.defaults.offsetY.bottom) + safeAreaBottom
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

MinDrawer.defaults = {
  offsetY: {
    center: -96,
    top: 32,
    bottom: 0,
  },
}

MinDrawer.displayName = 'MinDrawer'
