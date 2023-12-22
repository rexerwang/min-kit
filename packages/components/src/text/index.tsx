import { isNumber, isString } from '@min-kit/shared'
import { Text, TextProps } from '@tarojs/components'

export function renderText(text?: React.ReactNode, props: Omit<TextProps, 'children' | 'decode' | 'space'> = {}) {
  if (isString(text) || isNumber(text)) {
    return (
      <Text {...props} decode space='nbsp'>
        {text}
      </Text>
    )
  }

  return <>{text}</>
}
