import { Icon, type ReactProps } from '@min-kit/components'
import { go, toast } from '@min-kit/extends'
import { isString, Route } from '@min-kit/shared'
import { Text, View } from '@tarojs/components'
import { Current } from '@tarojs/taro'
import { useMemo } from 'react'

import { Pages } from '@/app.route'

export default function Layout({ title, children }: ReactProps<{ title?: string }>) {
  const routes = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const key in Pages) {
      const route = Pages[key]

      if (isString(route)) {
        if (!map['主包']) map['主包'] = {}
        map['主包'][key] = route
      } else {
        map['分包 ' + key] = route
      }
    }

    return map
  }, [])

  const navigate = (path: string) => {
    const current = Current.router?.path && Route.equals(Current.router.path, path)
    return () => (current ? toast('当前页') : go(path))
  }

  return (
    <View className='relative w-screen box-border'>
      <View className='flex-center-y px-4 py-2 bg-white'>
        <Icon name='react' size={120} onClick={() => go(Pages.PkgDemo.H5, { url: 'https://react.dev/' })} />
        <View className='flex-1 ml-4'>
          <View
            className='block text-black text-lg font-semibold'
            hoverClass='underline underline-offset-4'
            onClick={() => go(Pages.PkgDemo.H5, { url: 'https://github.com/rexerwang/min-kit' })}>
            @min-kit/template
          </View>
          <Text className='block text-sm text-gray-400'>
            小程序模版项目 基于
            <Text
              className='underline underline-offset-4'
              onClick={() => go(Pages.PkgDemo.H5, { url: 'https://taro-docs.jd.com/docs/' })}>
              React on Taro
            </Text>
          </Text>
        </View>
      </View>

      {children ? (
        <View className='mx-2 p-2 text-sm bg-neutral-100 rounded-lg'>
          <View className='p-1 font-semibold'>{title}</View>
          <View className='p-2'>{children}</View>
        </View>
      ) : (
        <View className='mx-2 p-2 text-sm bg-neutral-100 rounded-lg'>
          <View className='p-1 font-semibold'>页面导航</View>
          <View className='p-2'>
            {Object.entries(routes).map(([pkg, route]) => (
              <View key={pkg} className='mb-4'>
                <View className='text-gray-500'>{pkg}</View>
                {Object.entries(route).map(([label, path]) => (
                  <View
                    key={label}
                    className='mt-2 px-4 py-2 text-sm font-semibold text-black bg-white rounded-full'
                    hoverClass='shadow'
                    onClick={navigate(path)}>
                    <View className='flex-center-y'>
                      <View className='w-2/5'>{label}</View>
                      <View className='font-normal text-2xs text-gray-600 underline underline-offset-4 decoration-dotted'>
                        {path}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}

Layout.displayName = 'Layout'
