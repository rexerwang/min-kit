import { hasNavBar, hasTabBar, SystemInfo } from '@min-kit/extends'
import { px } from '@min-kit/shared'
import { MovableArea, MovableView, View } from '@tarojs/components'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

import { OptionsContext } from '../context'
import { uiStore } from '../store'
import Panel from './panel'

import type { MinDebuggerProps } from '../types'

export default function Debugger({ onMove, options = {} }: MinDebuggerProps) {
  const [visible, setVisible] = useState(false)
  const { x, y } = uiStore.position()

  const style = useMemo(() => {
    const top = hasNavBar() ? 0 : SystemInfo.menuButtonRect.bottom
    const bottom = hasTabBar() ? 0 : SystemInfo.screenHeight - SystemInfo.safeArea.bottom
    return px.of({ top, bottom })
  }, [])

  return (
    <OptionsContext.Provider value={options}>
      <View className={clsx('min-debugger', options.className)}>
        <View className={clsx(!visible && 'hidden')}>
          <Panel onClose={() => setVisible(false)} />
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
    </OptionsContext.Provider>
  )
}

Debugger.displayName = 'MinDebugger'
