import Current from './current'

import type { TaroRootElement } from '@tarojs/runtime'
import type { TaroDocument } from '@tarojs/runtime/dist/dom/document'

const doc = document as unknown as TaroDocument

function getRootElement() {
  const id = Current.page?.$taroPath
  return id ? doc.getElementById<TaroRootElement>(id) : null
}

export { doc as document, getRootElement }
