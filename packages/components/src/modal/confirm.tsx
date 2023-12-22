import { isString } from '@min-kit/shared'
import { Button, View } from '@tarojs/components'
import clsx from 'clsx'
import { ReactNode } from 'react'

import { Icon } from '../icon'
import { renderText } from '../text'
import { Modal } from './modal'

interface IProps {
  icon?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  okText: ReactNode
  cancelText?: ReactNode
  buttonInline?: boolean
  footer?: ReactNode
  /** @default true */
  divider?: boolean
  /** @default true when unset `cancelText` either */
  closeable?: boolean
  userSelect?: boolean
}

export const confirmModal = Modal.with<IProps, void, 'cancel' | 'close'>(
  'ConfirmModal',
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
    <View className={clsx('mini-confirm-modal', className)}>
      {icon && (isString(icon) ? <Icon name={icon} size={120} className='icon' /> : icon)}
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
          <Icon name='close' size={50} onClick={() => onCancel?.('close')} />
        </View>
      )}
    </View>
  ),
)
