import { copy } from '@min-kit/extends'
import { useMount, useQuery } from '@min-kit/hooks'
import { attempt } from '@min-kit/shared'
import { Button, Text, View } from '@tarojs/components'
import { getAccountInfoSync, getEnterOptionsSync, getSystemInfoSync } from '@tarojs/taro'
import clsx from 'clsx'
import { useState } from 'react'

import { prettyJSON } from '../../helper'

import type { IStatusOptions } from '../../types'

interface IProps extends IStatusOptions {}

export default function BasicModule({ user }: IProps) {
  const [state, setState] = useState<Record<string, string>>({})

  const Query = useQuery(async (reLogin?: boolean) => {
    const userInfo = prettyJSON(await attempt.async(user.getUserInfo, reLogin))
    const token = prettyJSON(attempt(user.getToken))
    const enterOptions = prettyJSON(attempt(getEnterOptionsSync))
    const systemInfo = prettyJSON(attempt(getSystemInfoSync))
    const accountInfo = prettyJSON(attempt(getAccountInfoSync))

    setState({ token, userInfo, enterOptions, systemInfo, accountInfo })
  })

  useMount(() => {
    Query.query()
  })

  return (
    <View className='basicModule panel'>
      <View className='main'>
        {Object.entries(state).map(([key, value]) => (
          <View key={key} className={clsx('section', !value && 'hidden')}>
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
