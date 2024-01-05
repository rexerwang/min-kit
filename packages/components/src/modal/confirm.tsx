import { isString } from '@min-kit/shared'
import { Button, View } from '@tarojs/components'
import clsx from 'clsx'

import { MinIcon } from '../icon'
import { renderText } from '../text'
import { withOpen } from './with'

import type { IModal } from './types'

export default withOpen<IModal.ConfirmProps, void, 'cancel' | 'close'>(
  'MinConfirm',
  ({
    icon,
    subtitle,
    title,
    okText,
    cancelText,
    buttonInline,
    footer,
    divider = true,
    closeable,
    userSelect,
    children,
    className,
    onOk,
    onCancel,
  }) => (
    <View className={clsx('min-confirm-modal', className)}>
      {icon && (isString(icon) ? <MinIcon name={icon} size={60} className='icon' /> : icon)}
      <View className='title'>{renderText(title, { userSelect })}</View>
      {!!subtitle && <View className='subtitle'>{renderText(subtitle, { userSelect })}</View>}
      {children}
      <View className={clsx(divider ? 'divider' : 'no-divider')} />
      {buttonInline && !!cancelText ? (
        <View className='buttons--inline'>
          <Button className='button cancel' onClick={() => onCancel?.('cancel')}>
            {cancelText}
          </Button>
          <Button className='button ok' onClick={() => onOk?.()}>
            {okText}
          </Button>
        </View>
      ) : (
        <View className='buttons'>
          <Button className='button ok' onClick={() => onOk?.()}>
            {okText}
          </Button>
          {!!cancelText && (
            <Button className='button cancel' onClick={() => onCancel?.('cancel')}>
              {cancelText}
            </Button>
          )}
        </View>
      )}

      {!!footer && <View className='footer'>{renderText(footer, { userSelect })}</View>}
      {(closeable || (closeable === undefined && !cancelText)) && (
        <View className='close'>
          <MinIcon name='close' size={24} onClick={() => onCancel?.('close')} />
        </View>
      )}
    </View>
  ),
)
