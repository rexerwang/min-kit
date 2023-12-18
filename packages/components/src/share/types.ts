import type { ShareAppMessageReturnObject } from '@tarojs/taro'

export interface IShareMessage extends ShareAppMessageReturnObject {}

export interface IShareProps {
  /** 分享内容 */
  message?: IShareMessage
}

export interface IShareMenu extends IShareProps {
  /** 分享朋友圈内容 默认同`message` */
  timeline?: Omit<IShareMessage, 'path'> & { query?: string }
  /** 菜单 发送给朋友 */
  onShareAppMessage?(): void
  /** 菜单 分享到朋友圈 */
  onShareTimeline?(): void
}
