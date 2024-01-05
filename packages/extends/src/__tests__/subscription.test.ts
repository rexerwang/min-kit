import Taro from '@tarojs/taro'

import { logger } from '../logger'
import * as _toasts from '../toast'

describe('subscription', () => {
  const getSettingSpy = jest.spyOn(Taro, 'getSetting')
  const openSettingSpy = jest.spyOn(Taro, 'openSetting')
  const requestSubscribeMessageSpy = jest.spyOn(Taro, 'requestSubscribeMessage')
  const showModalSpy = jest.spyOn(Taro, 'showModal')
  const toastSpy = jest.spyOn(_toasts, 'toast').mockImplementation(jest.fn())

  jest.spyOn(logger, 'error').mockImplementation(jest.fn())
  jest.spyOn(logger, 'warn').mockImplementation(jest.fn())

  afterEach(() => {
    getSettingSpy.mockClear()
    openSettingSpy.mockClear()
    requestSubscribeMessageSpy.mockClear()
    showModalSpy.mockClear()
    toastSpy.mockClear()
  })

  it('should request subscriptions successfully when given templates have accepted all', async () => {
    requestSubscribeMessageSpy.mockImplementation(jest.fn().mockResolvedValue({ ['xxx']: 'accept' }))
    const { requestSubscription } = await import('../subscription')

    expect(await requestSubscription(['xxx'])).toBeTruthy()
    expect(requestSubscribeMessageSpy).toHaveBeenCalledWith({ tmplIds: ['xxx'] })
  })

  it('should request subscriptions failed when given templates have rejected by user', async () => {
    requestSubscribeMessageSpy.mockImplementation(jest.fn().mockResolvedValue({ ['xxx']: 'reject' }))
    getSettingSpy.mockImplementation(jest.fn().mockResolvedValue({}))

    const { requestSubscription } = await import('../subscription')

    expect(await requestSubscription(['xxx'])).toBeFalsy()
    expect(getSettingSpy).toHaveBeenCalledWith({ withSubscriptions: true })
  })

  it('should request subscriptions failed when given setting is OFF', async () => {
    requestSubscribeMessageSpy.mockImplementation(jest.fn().mockResolvedValue({ ['xxx']: 'reject' }))
    getSettingSpy.mockImplementation(jest.fn().mockRejectedValue({ errCode: 20004 }))
    const { requestSubscription } = await import('../subscription')
    expect(await requestSubscription(['xxx'])).toBeFalsy()
    expect(toastSpy).toHaveBeenCalledWith('未授权订阅消息')
  })

  it('should request subscriptions failed when double confirm rejected', async () => {
    requestSubscribeMessageSpy.mockImplementation(jest.fn().mockResolvedValue({ ['xxx']: 'reject', ['yyy']: 'ban' }))
    getSettingSpy.mockImplementation(
      jest.fn().mockResolvedValue({ subscriptionsSetting: { itemSettings: { ['xxx']: 'reject', ['yyy']: 'ban' } } }),
    )
    showModalSpy.mockImplementation(jest.fn().mockResolvedValue({ confirm: false }))
    const { requestSubscription } = await import('../subscription')
    expect(await requestSubscription(['xxx', 'yyy'])).toBeFalsy()
    expect(showModalSpy).toHaveBeenCalledWith({ content: '需前往设置界面开启接收通知', confirmText: '去设置' })
    expect(openSettingSpy).not.toHaveBeenCalled()
    expect(toastSpy).toHaveBeenCalledWith('未授权订阅消息')
  })

  it('should request subscriptions successfully when double confirm accepted', async () => {
    requestSubscribeMessageSpy.mockImplementation(jest.fn().mockResolvedValue({ ['xxx']: 'reject' }))
    getSettingSpy.mockImplementation(
      jest.fn().mockResolvedValue({ subscriptionsSetting: { itemSettings: { ['xxx']: 'reject' } } }),
    )
    openSettingSpy.mockImplementation(
      jest.fn().mockResolvedValue({ subscriptionsSetting: { mainSwitch: true, itemSettings: { ['xxx']: 'accept' } } }),
    )
    showModalSpy.mockImplementation(jest.fn().mockResolvedValue({ confirm: true }))
    const { requestSubscription } = await import('../subscription')
    expect(await requestSubscription(['xxx'])).toBeTruthy()
    expect(openSettingSpy).toHaveBeenCalledWith({ withSubscriptions: true })
  })

  it('should request subscriptions failed when api failed', async () => {
    requestSubscribeMessageSpy.mockImplementation(jest.fn().mockRejectedValue({ errMsg: 20005 }))
    const { requestSubscription } = await import('../subscription')
    expect(await requestSubscription(['xxx'])).toBeFalsy()
    expect(toastSpy).toHaveBeenCalledWith('网络错误 请稍后再试')
  })
})
