import { SystemInfo } from '@miniapp/extends'
import { px } from '@miniapp/shared'
import { View } from '@tarojs/components'
import clsx from 'clsx'

import { ReactProps } from '../types'

const paddingTop = SystemInfo.menuButtonRect.top ?? SystemInfo.statusBarHeight,
  marginBottom = 10,
  width = SystemInfo.menuButtonRect.left,
  height = SystemInfo.menuButtonRect.height

export interface NavigationBarProps extends ReactProps {
  title?: React.ReactNode
}

export function NavigationBar({ className, children, title }: NavigationBarProps) {
  return (
    <View className={clsx('mini-navigation-bar ', className)} style={px.of({ paddingTop })}>
      <View className='mini-navigation-bar-body' style={px.of({ width, height, marginBottom })}>
        {title}
      </View>
      {children}
    </View>
  )
}

NavigationBar.displayName = 'MiniNavigationBar'
NavigationBar.rect = {
  height,
  width,
  top: paddingTop,
  bottom: height + paddingTop + marginBottom,
}
