import { isString, px } from '@min-kit/shared'
import { Image, ImageProps, View, ViewProps } from '@tarojs/components'
import clsx from 'clsx'
import { useMemo } from 'react'

export interface MinIconProps extends Omit<ImageProps, 'src' | 'mode'> {
  name: string
  /** `size` or `[width, height]` */
  size?: number | number[]
  style?: React.CSSProperties
}

export function MinIcon({ name, size = 36, ...props }: MinIconProps) {
  const style = useMemo(() => {
    let width: number
    let height: number

    if (Array.isArray(size)) {
      width = size[0]
      height = size[1]
    } else {
      width = size
      height = size
    }

    return { ...px.of({ width, height }), ...props.style }
  }, [props.style, size])

  return <Image {...props} src={MinIcon.configs[name]} style={style} />
}

MinIcon.displayName = 'MinIcon'

interface MinIconFontProps extends ViewProps {
  name: string
}

function IconFont({ name, className, ...props }: MinIconFontProps) {
  return (
    <View
      {...props}
      className={clsx('min-icon-font iconfont icon-' + name, className)}
      hoverClass={props.onClick ? props.hoverClass ?? 'min-icon-font--hover' : undefined}
    />
  )
}

IconFont.displayName = 'MinIconFont'
MinIcon.Font = IconFont

MinIcon.configs = {} as Record<string, string>
MinIcon.load = (icons: Record<string, string>) => {
  for (const name in icons) {
    const path = icons[name]
    if (path && isString(path)) {
      MinIcon.configs[name] = path
    }
  }
}
