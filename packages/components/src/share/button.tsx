import { useTaroId } from '@min-kit/hooks'
import { Button } from '@tarojs/components'
import { useEffect } from 'react'

import Event from './event'

import type { IMinShare } from './types'

export function ShareButton({ onShare, ...props }: IMinShare.ShareButtonProps) {
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
