import 'highlight.js/styles/github-dark.min.css'
import './index.scss'

import { copy } from '@min-kit/extends'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import { useMemo } from 'react'

import type { TaroText } from '@tarojs/runtime/dist'
import type { Text as ParsedText } from '@tarojs/runtime/dist/dom-external/inner-html/parser'

hljs.registerLanguage('typescript', typescript)

export function highlight(code: string) {
  const html = hljs.highlight(code, { language: 'typescript' }).value
  return html.replace(/\n/g, '<span>\n</span>')
}

// @ts-ignore
Taro.options.html.transformText = (taroText: TaroText, text: ParsedText) => {
  const content = text?.content ?? ''
  taroText.textContent = content
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')

  return taroText
}

interface IProps {
  children: string
  className?: string
}

export default function Code({ children, className }: IProps) {
  const html = useMemo(() => highlight(children), [children])

  return (
    <View
      className={clsx('code hljs', className)}
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={() => copy(children)}
    />
  )
}

interface ILayoutProps {
  className?: string
  title?: string
  code: string
}

Code.Layout = ({ className, title = 'example', code }: ILayoutProps) => {
  return (
    <View className={clsx('code-layout', className)}>
      <View className='code-layout-title'>{title}</View>
      <Code>{code}</Code>
    </View>
  )
}
