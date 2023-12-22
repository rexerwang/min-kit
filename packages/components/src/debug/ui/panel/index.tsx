import { hasNavBar, hasTabBar, SystemInfo } from '@min-kit/extends'
import { px } from '@min-kit/shared'
import { View } from '@tarojs/components'
import clsx from 'clsx'
import { useMemo } from 'react'

import { uiStore } from '../../store'
import AppModule from './app.module'
import BasicModule from './basic.module'
import NetworkModule from './network.module'

import type { IPanelProps } from '../../types'

const tabs = ['请求', '状态', '应用']

export default function Panel({ onClose, user }: IPanelProps) {
  const tab = uiStore.tab()

  const style = useMemo(() => {
    const top = hasNavBar() ? 80 : 100
    const bottom = hasTabBar() ? 0 : SystemInfo.screenHeight - SystemInfo.safeArea.bottom

    return px.of({ top, bottom })
  }, [])

  const tabBody = useMemo(() => {
    switch (tab) {
      case 0:
        return <NetworkModule />

      case 1:
        return <BasicModule user={user} />

      case 2:
        return <AppModule />
    }
  }, [tab, user])

  return (
    <View className='mini-debug-panel'>
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
