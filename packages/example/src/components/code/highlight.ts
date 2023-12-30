import { attempt, isString } from '@min-kit/shared'
import Taro from '@tarojs/taro'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'

import type { TaroText } from '@tarojs/runtime/dist'
import type { Text as ParsedText } from '@tarojs/runtime/dist/dom-external/inner-html/parser'

export default {
  setup() {
    hljs.registerLanguage('typescript', typescript)

    // set Taro transformText to decode escaped string
    attempt(() => {
      // @ts-ignore
      Taro.options.html.transformText = (taroText: TaroText, text: ParsedText) => {
        if (isString(text?.content)) {
          taroText.textContent = text.content
            .replace(/&#x27;/g, "'")
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&amp;/g, '&')
        }

        return taroText
      }
    })
  },
  highlight(code: string, language = 'typescript') {
    const html = hljs.highlight(code, { language }).value
    return html.replace(/\n/g, '<span>\n</span>')
  },
}
