import { getSetting, openSetting, requestSubscribeMessage, showModal } from '@tarojs/taro'

import { logger } from './logger'
import { toast } from './toast'

// 错误码 https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html#%E9%94%99%E8%AF%AF%E7%A0%81
const enum ErrCode {
  /** 用户关闭了主开关，无法进行订阅 */
  OFF = 20004,
  /** 设置不接收 */
  REJECT_BY_SETTING = -1,
  /** 用户拒绝 */
  REJECT_BY_USER = -2,
}

const enum Result {
  /** 表示用户同意订阅该条id对应的模板消息 */
  ACCEPT = 'accept',
  /** 表示用户接收订阅消息并开启了语音提醒 */
  ACCEPT_WITH_AUDIO = 'acceptWithAudio',
  /** 表示用户拒绝订阅该条id对应的模板消息 */
  REJECT = 'reject',
  /** 表示已被后台封禁 */
  BAN = 'ban',
  /** 表示该模板因为模板标题同名被后台过滤 */
  FILTER = 'filter',
}

interface IOptions {
  confirm(): Promise<boolean>
}

const defaultOptions: IOptions = {
  confirm: () => showModal({ content: '需前往设置界面开启接收通知', confirmText: '去设置' }).then((res) => res.confirm),
}

const filterResult = (tmplIds: string[], result: Record<string, string>) => {
  const rejects: string[] = [],
    bans: string[] = []

  for (const id of tmplIds) {
    switch (result[id] ?? Result.REJECT) {
      case Result.REJECT:
        rejects.push(id)
        break
      case Result.BAN:
      case Result.FILTER:
        bans.push(id)
        break
    }
  }

  // ignore banned templates & logging error
  if (bans.length) logger.error('#requestSubscription', '#ban', bans)

  return rejects
}

const requestOpenSetting = async (tmplIds: string[], confirm: IOptions['confirm']) => {
  try {
    if (await confirm()) {
      const { subscriptionsSetting } = await openSetting({ withSubscriptions: true })
      logger.debug('#requestSubscription', 'openSetting', subscriptionsSetting)
      if (subscriptionsSetting?.mainSwitch && subscriptionsSetting.itemSettings) {
        const rejects = filterResult(tmplIds, subscriptionsSetting.itemSettings)
        return rejects.length === 0
      }
    }
  } catch (error) {
    logger.error('#requestSubscription', 'requestOpenSetting', error)
  }

  return false
}

export async function requestSubscription(tmplIds: string[], opts: Partial<IOptions>) {
  const options: IOptions = Object.assign({}, defaultOptions, opts)

  try {
    const rejects = filterResult(tmplIds, (await requestSubscribeMessage({ tmplIds })) as Record<string, string>)
    if (rejects.length === 0) return true
    const { subscriptionsSetting } = await getSetting({ withSubscriptions: true })
    logger.debug('#requestSubscription', 'getSetting', subscriptionsSetting, { rejects })
    const itemSettings = subscriptionsSetting?.itemSettings ?? {}
    const settingRejects = filterResult(Object.keys(itemSettings), itemSettings)
    if (settingRejects.length && rejects.every((i) => settingRejects.includes(i))) {
      throw { errCode: ErrCode.REJECT_BY_SETTING }
    } else {
      throw { errCode: ErrCode.REJECT_BY_USER }
    }
  } catch (error: any) {
    switch (error.errCode) {
      case ErrCode.REJECT_BY_SETTING:
      case ErrCode.OFF:
        if (await requestOpenSetting(tmplIds, options.confirm)) return true
        toast('未授权订阅消息')
        logger.warn('#requestSubscription', 'REJECT_BY_SETTING')
        break
      case ErrCode.REJECT_BY_USER:
        toast('未授权订阅消息')
        logger.warn('#requestSubscription', 'REJECT_BY_USER')
        break
      default:
        toast('网络错误 请稍后再试')
        logger.error('#requestSubscription', error, tmplIds)
        break
    }
  }

  return false
}
