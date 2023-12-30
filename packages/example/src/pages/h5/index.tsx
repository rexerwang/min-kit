import { MinIcon, MinText } from '@min-kit/components'
import { logger } from '@min-kit/extends'
import { useRouterParams } from '@min-kit/hooks'
import { View, WebView } from '@tarojs/components'
import { useEffect, useState } from 'react'

export default function Index() {
  const params = useRouterParams<'url'>()
  const [error, setError] = useState<string>()

  const onError = ({ detail }: any) => {
    setError((detail.errMsg ?? '页面加载失败') + '\n' + (detail.fullUrl ?? params.url))
    logger.error('#webview', detail)
  }

  useEffect(() => {
    if (!params.url) setError('缺少参数 无法加载页面\nMissing parameter: url')
    else if (!/^https:\/\/+/.test(params.url)) setError('非法参数 无法加载页面\nInvalid parameter: url')
  }, [params.url])

  if (error) {
    return (
      <View className='box-border relative h-screen w-screen bg-neutral-50'>
        <View className='pt-10 text-center'>
          <MinIcon className='grayscale opacity-50' name='error' size={60} />
          <View className='px-6 text-2xs text-gray-400 font-thin'>
            <MinText userSelect>{error}</MinText>
          </View>
        </View>
      </View>
    )
  }

  return <WebView src={params.url} onError={onError} />
}

definePageConfig({})
