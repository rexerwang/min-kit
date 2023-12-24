import { SystemInfo } from '@min-kit/extends'
import { px } from '@min-kit/shared'
import { View } from '@tarojs/components'
import clsx from 'clsx'

import type { ReactProps } from '../types'

const paddingTop = SystemInfo.menuButtonRect.top ?? SystemInfo.statusBarHeight,
  marginBottom = 10,
  width = SystemInfo.menuButtonRect.left,
  height = SystemInfo.menuButtonRect.height

export interface MinNavigationBarProps extends ReactProps {
  title?: React.ReactNode
}

export function MinNavigationBar({ className, children, title }: MinNavigationBarProps) {
  return (
    <View className={clsx('min-navigation-bar', className)} style={px.of({ paddingTop })}>
      <View className='min-navigation-bar-body' style={px.of({ width, height, marginBottom })}>
        {title}
      </View>
      {children}
    </View>
  )
}

MinNavigationBar.displayName = 'MinNavigationBar'
MinNavigationBar.rect = {
  height,
  width,
  top: paddingTop,
  bottom: height + paddingTop + marginBottom,
}
