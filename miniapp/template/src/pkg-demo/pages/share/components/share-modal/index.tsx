import { Modal, ShareButton } from '@miniapp/components'
import { logger } from '@miniapp/extends'
import { useCountdown } from '@miniapp/hooks'
import { Button, Text, View } from '@tarojs/components'

export default Modal.with<{}, void, void>('ShareModal', ({ onCancel }) => {
  const [, { seconds }] = useCountdown({ leftTime: 20 * 1000, onEnd: onCancel })

  return (
    <View className='relative box-border w-[632px] p-5 text-center bg-white rounded-3xl confirm--themed'>
      <View className='text-lg font-normal leading-6'>
        分享赢好礼 <Text className='text-sm text-black/60'>{seconds}s</Text>
      </View>
      <View className='mt-5'>
        <ShareButton
          className='flex flex-col items-center justify-center text-sm font-normal text-white bg-black rounded-[96px] w-[420px] h-12 ok'
          message={{
            title: '来自弹窗按钮的分享内容',
          }}
          onShare={() => {
            logger.debug('#shareModal', '已分享')
          }}>
          去分享
        </ShareButton>
        <Button
          className='w-fit h-fit p-0 mt-[20px] bg-transparent text-xs font-normal leading-[36px] text-black border-t-0 border-l-0 border-r-0 border-b-2 border-solid border-black rounded-none after:content-none cancel'
          onClick={() => onCancel?.()}>
          取消
        </Button>
      </View>
    </View>
  )
})
