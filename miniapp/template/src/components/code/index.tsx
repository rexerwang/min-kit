import 'highlight.js/styles/github-dark.min.css'
import './index.scss'

import { Modal } from '@min-kit/components'
import { copy } from '@min-kit/extends'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import clsx from 'clsx'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import { useMemo } from 'react'

import type { TaroText } from '@tarojs/runtime/dist'
import type { Text as ParsedText } from '@tarojs/runtime/dist/dom-external/inner-html/parser'

hljs.registerLanguage('typescript', typescript)

export function highlight(code: string, language = 'typescript') {
  const html = hljs.highlight(code, { language }).value
  return html.replace(/\n/g, '<span>\n</span>')
}

// set Taro transformText
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

export interface MinCodeProps {
  children: string
  className?: string
  lang?: string
  raw?: boolean
}

export default function MinCode({ children, className, lang, raw }: MinCodeProps) {
  const html = useMemo(() => (raw ? children : highlight(children, lang)), [children, lang, raw])

  return (
    <Text
      className={clsx('code hljs', className)}
      dangerouslySetInnerHTML={{ __html: html }}
      decode
      space='nbsp'
      userSelect
    />
  )
}

MinCode.popup = Modal.with<{
  className?: string
  title?: string
  code: string
  lang?: string
}>(
  'MinCodePopup',
  ({ onOk, title = 'example', lang = 'ts', code }) => (
    <View className='min-code-popup'>
      <View className='min-code-popup-header'>
        <View className='name'>{title}</View>
        <View className='ops'>
          <View className='op lang'>.{lang}</View>
          <View className='op' hoverClass='hover' onClick={() => copy(code)}>
            复制
          </View>
          <View className='op' hoverClass='hover' onClick={onOk}>
            关闭
          </View>
        </View>
      </View>
      <MinCode className='min-code-popup-body'>{code}</MinCode>
    </View>
  ),
  { offsetY: 0 },
)
