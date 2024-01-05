import { hasNavBar, hasTabBar, SystemInfo } from '@min-kit/extends'
import { px } from '@min-kit/shared'
import { View } from '@tarojs/components'
import clsx from 'clsx'
import { useMemo } from 'react'

import { uiStore } from '../../store'
import AppPanel from './AppPanel'
import NetworkPanel from './NetworkPanel'
import StatusPanel from './StatusPanel'

interface IProps {
  onClose(): void
}

const tabs = ['请求', '应用', '状态']

export default function Panel({ onClose }: IProps) {
  const tab = uiStore.tab()

  const style = useMemo(() => {
    const top = hasNavBar() ? 80 : 100
    const bottom = hasTabBar() ? 0 : SystemInfo.screenHeight - SystemInfo.safeArea.bottom

    return px.of({ top, bottom })
  }, [])

  const tabBody = useMemo(() => {
    switch (tab) {
      case 0:
        return <NetworkPanel />
      case 1:
        return <AppPanel />
      case 2:
        return <StatusPanel />
    }
  }, [tab])

  return (
    <View className='min-debug-panel'>
      <View className='mask' onClick={onClose}></View>
      <View className='container' style={style}>
        <View className='tabs'>
          <View className='tabHeader'>
            {tabs.map((name, i) => (
              <View className={clsx('tab', i === tab && 'active')} key={i} onClick={() => uiStore.setTab(i)}>
                {name}
              </View>
            ))}
          </View>
          <View className='tabBody'>{tabBody}</View>
        </View>
      </View>
    </View>
  )
}

Panel.displayName = 'MinDebuggerPanel'
