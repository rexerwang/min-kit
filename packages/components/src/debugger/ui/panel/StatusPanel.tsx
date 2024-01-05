import { copy } from '@min-kit/extends'
import { useMount, useQuery } from '@min-kit/hooks'
import { attempt } from '@min-kit/shared'
import { Button, Text, View } from '@tarojs/components'
import { getAccountInfoSync, getEnterOptionsSync, getSystemInfoSync } from '@tarojs/taro'
import { useContext } from 'react'

import { OptionsContext } from '../../context'
import { prettyJSON } from '../../helper'

export default function StatusPanel() {
  const { StatusHeader, StatusFooter, StatusButton } = useContext(OptionsContext)

  const Query = useQuery(async () => {
    const enterOptions = prettyJSON(attempt(getEnterOptionsSync))
    const systemInfo = prettyJSON(attempt(getSystemInfoSync))
    const accountInfo = prettyJSON(attempt(getAccountInfoSync))

    return { enterOptions, systemInfo, accountInfo }
  })

  useMount(() => {
    Query.query()
  })

  return (
    <View className='StatusPanel panel'>
      <View className='main'>
        {!!StatusHeader && <StatusHeader />}
        {!!Query.data &&
          Object.entries(Query.data).map(([key, value]) => (
            <View key={key} className='section'>
              <Text className='title'>{key}</Text>
              <Text className='content' decode space='nbsp' onClick={() => copy(value)}>
                {value}
              </Text>
            </View>
          ))}
        {!!StatusFooter && <StatusFooter />}
      </View>
      <View className='footer'>
        <Button plain loading={Query.loading} onClick={Query.query}>
          刷新
        </Button>
        {!!StatusButton && <StatusButton />}
      </View>
    </View>
  )
}

StatusPanel.displayName = 'MinDebuggerStatusPanel'
