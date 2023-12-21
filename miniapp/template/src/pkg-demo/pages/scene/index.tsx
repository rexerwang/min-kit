import { scene } from '@miniapp/extends'
import { useAppScene, useAppShow, useMount } from '@miniapp/hooks'
import { View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { useState } from 'react'

import Layout from '@/pkg-demo/shared/components/layout'

export default function Index() {
  const scene0 = useAppScene()
  const [scene1, setScene1] = useState<number>()
  const [scene2, setScene2] = useState<number>()
  const [scene3, setScene3] = useState<number>()

  useMount(() => {
    setScene1(scene.current)
  })

  useAppShow((res) => {
    setScene2(res.scene)
  })

  useDidShow((res) => {
    setScene3(res?.scene)
  })

  return (
    <Layout title='场景值'>
      <View className='flex-center-y mb-2 p-2 border-b-2 border-gray-200'>
        <View className='w-2/3'>useAppScene</View>
        <View> = {scene0 ?? 'undefined'}</View>
      </View>

      <View className='flex-center-y mb-2 p-2 border-b-2 border-gray-200'>
        <View className='w-2/3'>scene.current</View>
        <View> = {scene1 ?? 'undefined'}</View>
      </View>

      <View className='flex-center-y mb-2 p-2 border-b-2 border-gray-200'>
        <View className='w-2/3'>useAppShow</View>
        <View> = {scene2 ?? 'undefined'}</View>
      </View>

      <View className='flex-center-y mb-2 p-2 border-b-2 border-gray-200'>
        <View className='w-2/3'>useDidShow</View>
        <View> = {scene3 ?? 'undefined'}</View>
      </View>
    </Layout>
  )
}

definePageConfig({
  navigationBarTitleText: '获取场景值',
})
