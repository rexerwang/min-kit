import { hasNavBar, hasTabBar, SystemInfo } from '@miniapp/extends'
import { px } from '@miniapp/shared'
import { MovableArea, MovableView, View } from '@tarojs/components'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

import { uiStore } from '../../store'
import Panel from '../panel'

import type { IDebuggerProps } from '../../types'

export default function Debugger({ onMove, user }: IDebuggerProps) {
  const [visible, setVisible] = useState(false)
  const { x, y } = uiStore.position()

  const style = useMemo(() => {
    const top = hasNavBar() ? 0 : SystemInfo.menuButtonRect.bottom
    const bottom = hasTabBar() ? 0 : SystemInfo.screenHeight - SystemInfo.safeArea.bottom
    return px.of({ top, bottom })
  }, [])

  return (
    <View className='mini-debugger'>
      <View className={clsx(!visible && 'hidden')}>
        <Panel onClose={() => setVisible(false)} user={user} />
      </View>
      <MovableArea className='movable-area' style={style}>
        <MovableView
          className={clsx('movable-view', visible && 'hidden')}
          direction='all'
          animation={false}
          x={x}
          y={y}
          onChange={(e) => onMove?.({ x: e.detail.x, y: e.detail.y })}
          onClick={() => setVisible(true)}>
          debugger
        </MovableView>
      </MovableArea>
    </View>
  )
}

Debugger.displayName = 'MiniDebugger'
