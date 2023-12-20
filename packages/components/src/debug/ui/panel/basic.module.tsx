import { copy } from '@miniapp/extends'
import { useQuery } from '@miniapp/hooks'
import { attempt } from '@miniapp/shared'
import { Button, Text, View } from '@tarojs/components'
import { getAccountInfoSync, getEnterOptionsSync, getSystemInfoSync } from '@tarojs/taro'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { prettyJSON } from '../../helper'

import type { IBasicProps } from '../../types'

export default function BasicModule({ user }: IBasicProps) {
  const [state, setState] = useState<Record<string, string>>({})

  const Query = useQuery(async (reLogin?: boolean) => {
    const userInfo = prettyJSON(await attempt.async(user.getUserInfo, reLogin))
    const token = prettyJSON(attempt(user.getToken))
    const enterOptions = prettyJSON(attempt(getEnterOptionsSync))
    const systemInfo = prettyJSON(attempt(getSystemInfoSync))
    const accountInfo = prettyJSON(attempt(getAccountInfoSync))

    setState({ token, userInfo, enterOptions, systemInfo, accountInfo })
  })

  useEffect(() => {
    Query.query()
  }, [])

  return (
    <View className={clsx('basicModule', 'panel')}>
      <View className='main'>
        {Object.entries(state).map(([key, value]) => (
          <View key={key} className='section'>
            <Text className='title'>{key}</Text>
            <Text className='content' decode space='nbsp' onClick={() => copy(value)}>
              {value}
            </Text>
          </View>
        ))}
      </View>
      <View className='footer'>
        <Button plain loading={Query.loading} onClick={() => Query.query()}>
          刷新
        </Button>
        <Button plain loading={Query.loading} onClick={() => Query.query(true)}>
          重新登录
        </Button>
      </View>
    </View>
  )
}
