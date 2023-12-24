import { isNumber, isString } from '@min-kit/shared'
import { Text, type TextProps } from '@tarojs/components'

export interface MinTextProps extends TextProps {}

export function MinText({ decode = true, space = 'nbsp', children, ...props }: MinTextProps) {
  return (
    <Text {...props} decode={decode} space={space}>
      {children}
    </Text>
  )
}

export function renderText(text?: React.ReactNode, props: Omit<MinTextProps, 'children'> = {}) {
  if (isString(text) || isNumber(text)) {
    return <MinText {...props}>{text}</MinText>
  }

  return <>{text}</>
}
