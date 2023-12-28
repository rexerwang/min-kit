export const MinIconPropTypeSnippet = `
import type { ImageProps } from '@tarojs/components'

interface MinIconProps extends Omit<ImageProps, 'src' | 'mode'> {
  name: string
  /** \`size\` or \`[width, height]\` @default 16 */
  size?: number | number[]
  style?: React.CSSProperties
}
`

export const MinIconUsageSnippet = ` // load icons at first
MinIcon.load({
  'react': require('./react.svg')
})

<MinIcon name='react' />`

export const MinIconFontPropTypeSnippet = `
import type { ViewProps } from '@tarojs/components'

interface MinIconFontProps extends Omit<ViewProps, 'children'> {
  name: string
}
`

export const MinIconFontUsageSnippet = `
// download css from https://iconfont.cn

<MinIcon.Font name='react' />`
