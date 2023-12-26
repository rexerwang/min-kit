import { MinIcon, type ReactProps } from '@min-kit/components'
import { go, toast } from '@min-kit/extends'
import { useRouter } from '@min-kit/hooks'
import { isEmpty, isString, Route } from '@min-kit/shared'
import { Text, View } from '@tarojs/components'
import { useMemo } from 'react'

import { Pages } from '@/app.route'

export default function Layout({ title, children }: ReactProps<{ title?: string }>) {
  const { path: routePath } = useRouter()

  const pkgRoutes = useMemo(() => {
    const res: [string, Record<string, string>][] = []
    const isHome = Route.equals(Pages.Index, routePath)

    Object.entries(Pages).forEach(([pkg, routes]) => {
      if (isString(routes)) return

      const name = pkg.replace(/^Pkg/, '').toLowerCase()

      const subRoutes = Object.entries(routes).reduce((obj, [key, route]) => {
        if (isHome) {
          obj[`${name} / ${key}`] = route
        } else if (Route.includes(routePath, route)) {
          obj[key] = route
        }
        return obj
      }, {})

      res.push([name, subRoutes])
    })

    return res.filter(([_, value]) => !isEmpty(value))
  }, [routePath])

  const navigate = (path: string) => {
    const current = Route.equals(routePath, path)
    return () => (current ? toast('当前页') : go(path))
  }

  return (
    <View className='relative w-screen box-border'>
      <View className='flex-center-y px-4 py-2 bg-white'>
        <MinIcon name='react' size={40} onClick={() => go(Pages.H5, { url: 'https://react.dev/' })} />
        <View className='flex-1 ml-4'>
          <View
            className='block text-black text-lg font-semibold'
            hoverClass='underline underline-offset-4'
            onClick={() => go(Pages.H5, { url: 'https://github.com/rexerwang/min-kit' })}>
            @min-kit/template
          </View>
          <Text className='block text-sm text-gray-400'>
            小程序模版项目 基于
            <Text
              className='underline underline-offset-4'
              onClick={() => go(Pages.H5, { url: 'https://taro-docs.jd.com/docs/' })}>
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
            {pkgRoutes.map(([name, routes]) => (
              <View key={name} className='mb-4'>
                <View className='text-gray-500'>{name}</View>
                {Object.entries(routes).map(([label, path]) => (
                  <View
                    key={label}
                    className='mt-2 px-6 py-2 text-sm font-semibold text-black bg-white rounded-full'
                    hoverClass='brightness-90'
                    onClick={navigate(path)}>
                    <View>
                      <View>{label}</View>
                      <View className='font-normal text-2xs text-gray-600 break-all underline underline-offset-4 decoration-dotted'>
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
