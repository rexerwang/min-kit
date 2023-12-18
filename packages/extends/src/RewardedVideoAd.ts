import { createRewardedVideoAd as createRewardedVideoAdApi, eventCenter } from '@tarojs/taro'

import { logger } from './logger'
import { toast } from './toast'

class RewardedVideoAd {
  private ad: Taro.RewardedVideoAd
  private eventName: string

  error: any
  done = false

  constructor(private adUnitId: string) {
    this.eventName = 'RewardedVideoAd#' + adUnitId

    this.ad = createRewardedVideoAdApi({ adUnitId: this.adUnitId })
    this.ad.onError((e) => {
      this.error = e
      logger.error('#ad', '#RewardedVideoAd', 'onError', this.adUnitId, e)
    })
    this.ad.onLoad(() => {
      logger.debug('#ad', '#RewardedVideoAd', 'onLoad', this.adUnitId)
    })
    this.ad.onClose((e) => {
      this.done = !!e.isEnded
      eventCenter.trigger(this.eventName, !!e.isEnded)
      logger.debug('#ad', '#RewardedVideoAd', 'onClose', this.adUnitId, e)
    })
  }

  show() {
    return new Promise<boolean>((resolve) => {
      eventCenter.off(this.eventName).once(this.eventName, resolve)

      toast.loading()
      this.ad
        .show()
        // retry
        .catch(() => this.ad.load().then(() => this.ad.show()))
        // skip error
        .catch((e) => {
          resolve(true)
          this.error = e
          logger.error('#ad', '#RewardedVideoAd', 'show', this.adUnitId, e)
        })
        .then(() => {
          toast.clear()
        })
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
