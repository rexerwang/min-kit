import { Image, type ImageProps } from '@tarojs/components'
import { previewImage } from '@tarojs/taro'
import clsx from 'clsx'
import { useState } from 'react'

export interface ImgProps extends Omit<ImageProps, 'preview'> {
  /**
   * - `true`: enable preview
   * - `string[]`: preview multiple images
   */
  preview?: boolean | string[]
}

/**
 * enhance image component
 *
 * Features:
 * - enable `lazyLoad` as default
 * - support `previewImage` when click
 * - add loading style
 * - add error style
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/component/image.html
 */
export function Img({ preview, ...props }: ImgProps) {
  const [loaded, setLoaded] = useState<boolean>()
  const onLoad = (e: any) => {
    props.onLoad?.(e)
    setLoaded(true)
  }
  const onError = (e: any) => {
    props.onError?.(e)
    setLoaded(false)
  }
  const onClick = (e: any) => {
    props.onClick?.(e)

    if (loaded && preview) {
      if (Array.isArray(preview)) {
        const current = process.env.TARO_ENV === 'alipay' ? preview.indexOf(props.src) : props.src
        previewImage({ urls: preview, current })
      } else previewImage({ urls: [props.src] })
    }
  }

  return (
    <Image
      {...props}
      className={clsx(loaded === undefined && 'mini-img--load', loaded === false && 'mini-img--error', props.className)}
      lazyLoad={props.lazyLoad !== false}
      onLoad={onLoad}
      onError={onError}
      onClick={onClick}
    />
  )
}

Img.displayName = 'MiniImg'
