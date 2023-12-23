import { createRewardedVideoAd as createRewardedVideoAdApi, eventCenter } from '@tarojs/taro'

import { logger } from './logger'
import { toast } from './toast'

class RewardedVideoAd {
  private ad: Taro.RewardedVideoAd
  private eventName: string

  error: any
  done = false

  constructor(private adUnitId: string) {
    this.eventName = 'RewardedVideoAdOnClose#' + adUnitId

    this.ad = createRewardedVideoAdApi({ adUnitId })
    this.ad.onError((e) => {
      this.error = e
      logger.error('#ad', '#RewardedVideoAd', 'onError', this.adUnitId, e)
    })
    this.ad.onLoad(() => {
      this.error = null
      logger.debug('#ad', '#RewardedVideoAd', 'onLoad', this.adUnitId)
    })
    this.ad.onClose((e) => {
      this.done = !!e?.isEnded
      eventCenter.trigger(this.eventName, this.done)
      logger.debug('#ad', '#RewardedVideoAd', 'onClose', this.adUnitId, e)
    })
  }

  private showAd() {
    return this.ad.show().catch(() => this.ad.load().then(() => this.ad.show()))
  }

  show() {
    return new Promise<boolean>((resolve) => {
      eventCenter.off(this.eventName).once(this.eventName, resolve)

      toast
        .loading()
        .then(() => this.showAd())
        .catch(() => resolve(true))
        .then(toast.clear)
    })
  }

  showOnce() {
    if (this.done) return Promise.resolve(true)
    return this.show()
  }
}

export function createRewardedVideoAd(adUnitId: string) {
  return new RewardedVideoAd(adUnitId)
}
