import { confirmModal } from '@min-kit/components'
import { toast } from '@min-kit/extends'
import { sleep } from '@min-kit/shared'

import type { IConfirmConfig } from './confirm.config'

export * from './confirm.config'

export async function showConfirm(config: IConfirmConfig) {
  const modal = confirmModal({
    okText: '知道了',
    title: config.label,
    ...config.props,
  })

  if (config.timeout) {
    sleep(config.timeout).then(() => modal.unmount())
  }

  const res = await modal

  toast(JSON.stringify(res))
}
