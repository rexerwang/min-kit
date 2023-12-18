import { useDidShow } from '@tarojs/taro'
import { useState } from 'react'

export function useScanLaunchTime() {
  const [timestamp, setTimestamp] = useState<string>()

  useDidShow((options) => {
    const { q, scancode_time: time } = options?.query || {}
    q && time && setTimestamp(time)
  })

  return timestamp
}
