import type { ButtonProps } from '@tarojs/components'
import type { ShareAppMessageReturnObject } from '@tarojs/taro'

export namespace IMinShare {
  export type Message = ShareAppMessageReturnObject

  export interface ShareMessage {
    message?: Message
  }

  export interface ShareMenu extends ShareMessage {
    /** 分享朋友圈内容 默认同`message` */
    timeline?: Omit<Message, 'path'> & { query?: string }
    /** 菜单 发送给朋友 */
    onShareAppMessage?(): void
    /** 菜单 分享到朋友圈 */
    onShareTimeline?(): void
  }

  export interface ShareButtonProps extends Omit<ButtonProps, 'openType' | 'id'>, ShareMessage {
    onShare?(): void
  }
}
