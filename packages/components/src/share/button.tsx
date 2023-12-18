import { useTaroId } from '@miniapp/hooks'
import { Button, ButtonProps } from '@tarojs/components'
import { useEffect } from 'react'

import Event from './event'

import type { IShareProps } from './types'

export interface ShareButtonProps extends Omit<ButtonProps, 'openType' | 'id'>, IShareProps {
  /** 触发分享（结果未知） */
  onShare?(): void
}

/** 分享按钮 */
export function ShareButton({ onShare, ...props }: ShareButtonProps) {
  const id = useTaroId()

  useEffect(() => {
    if (onShare) {
      Event.off(id).on(id, onShare)
    }

    return () => {
      Event.off(id)
    }
  }, [onShare, id])

  return <Button {...props} openType='share' id={id} />
}
