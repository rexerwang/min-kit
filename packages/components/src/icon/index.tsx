import { isString } from '@min-kit/shared'
import { Image, ImageProps, View, ViewProps } from '@tarojs/components'
import clsx from 'clsx'
import { useMemo } from 'react'

interface IconProps extends Omit<ImageProps, 'src' | 'mode'> {
  name: string
  /** `size` or `[width, height]` */
  size?: number | number[]
  style?: React.CSSProperties
}

export function Icon({ name, size = 36, ...props }: IconProps) {
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

    return { width: width + 'rpx', height: height + 'rpx', ...props.style }
  }, [props.style, size])

  return <Image {...props} src={Icon.configs[name]} style={style} />
}

Icon.displayName = 'MiniIcon'

interface IconFontProps extends ViewProps {
  name: string
}

function IconFont({ name, className, ...props }: IconFontProps) {
  return (
    <View
      {...props}
      className={clsx('mini-icon-font iconfont icon-' + name, className)}
      hoverClass={props.onClick ? props.hoverClass ?? 'mini-icon-font--hover' : undefined}
    />
  )
}

IconFont.displayName = 'MiniIconFont'
Icon.Font = IconFont

Icon.configs = {} as Record<string, string>
Icon.load = (icons: Record<string, string>) => {
  for (const name in icons) {
    const path = icons[name]
    if (path && isString(path)) {
      Icon.configs[name] = path
    }
  }
}
