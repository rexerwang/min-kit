import './index.scss'

import { Modal } from '@min-kit/components'
import { copy } from '@min-kit/extends'
import { useToggle } from '@min-kit/hooks'
import { Text, View } from '@tarojs/components'
import clsx from 'clsx'
import { useMemo } from 'react'

import highlight from './highlight'

highlight.setup()

export interface MinCodeProps {
  children: string
  className?: string
  lang?: string
  raw?: boolean
}

export default function MinCode({ children, className, lang, raw }: MinCodeProps) {
  const html = useMemo(() => (raw ? children : highlight.highlight(children, lang)), [children, lang, raw])

  return (
    <Text
      className={clsx('min-code hljs', className)}
      dangerouslySetInnerHTML={{ __html: html }}
      decode
      space='nbsp'
      userSelect
    />
  )
}

MinCode.displayName = 'MinCode'

export interface MinCodeLayoutProps extends MinCodeProps {
  codeClass?: string
  title?: string
  operator?: React.ReactNode
}

function Layout({ title = 'example', className, codeClass, lang = 'ts', operator, ...props }: MinCodeLayoutProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [wrap, toggleWrap] = useToggle(false)

  return (
    <View className={clsx('min-code-layout', className)}>
      <View className='min-code-layout-header'>
        <View className='name'>{title}</View>
        <View className='ops'>
          <View className='op light'>.{lang}</View>
          <View className={clsx('op', wrap && 'active')} hoverClass='hover' onClick={() => toggleWrap()}>
            wrap
          </View>
          <View className='op' hoverClass='hover' onClick={() => copy(props.children)}>
            copy
          </View>
          {operator}
        </View>
      </View>
      <MinCode className={clsx('min-code-layout-body', wrap && 'wrap', codeClass)} {...props} />
    </View>
  )
}

Layout.displayName = 'MinCodeLayout'
MinCode.Layout = Layout

MinCode.popup = Modal.with<Omit<MinCodeLayoutProps, 'children'> & { code: string }>(
  Layout.displayName,
  ({ onOk, className, code, ...props }) => (
    <Layout
      {...props}
      className={clsx('w-screen h-screen', className)}
      operator={
        <View className='op' hoverClass='hover' onClick={onOk}>
          close
        </View>
      }>
      {code}
    </Layout>
  ),
  { offsetY: 0 },
)
