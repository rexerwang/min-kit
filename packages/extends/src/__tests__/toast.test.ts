import Taro from '@tarojs/taro'

import { logger } from '../logger'

describe('toast', () => {
  const showToastSpy = jest.spyOn(Taro, 'showToast')
  const hideToastSpy = jest.spyOn(Taro, 'hideToast')
  const showLoadingSpy = jest.spyOn(Taro, 'showLoading')
  const hideLoadingSpy = jest.spyOn(Taro, 'hideLoading')

  afterEach(() => {
    showToastSpy.mockClear()
    hideToastSpy.mockClear()
    showLoadingSpy.mockClear()
    hideLoadingSpy.mockClear()
  })

  it('should showToast message with option', async () => {
    const { toast } = await import('../toast')

    await toast('message')

    expect(showToastSpy).toHaveBeenCalledWith({ title: 'message', icon: 'none', duration: 1500 })
  })

  it('should warn error when given showToast has failed', async () => {
    showToastSpy.mockImplementation(jest.fn().mockRejectedValue('error'))
    const warnSpy = jest.spyOn(logger, 'warn').mockImplementation(jest.fn())
    const { toast } = await import('../toast')
    await toast('message')

    expect(warnSpy).toHaveBeenCalledWith('#toast', 'error')
  })

  it('should showToast success message via toast.success', async () => {
    const { toast } = await import('../toast')
    await toast.success()

    expect(showToastSpy).toHaveBeenCalledWith({ title: '操作成功', icon: 'success', duration: 1500 })
  })

  it('should showToast error message via toast.success', async () => {
    const { toast } = await import('../toast')
    await toast.error()

    expect(showToastSpy).toHaveBeenCalledWith({ title: '操作失败', icon: 'error', duration: 1500 })
  })

  it('should showLoading via toast.loading', async () => {
    const { toast } = await import('../toast')
    await toast.loading()
    expect(showLoadingSpy).toHaveBeenCalledWith({ title: '加载中...', mask: true })

    await toast.clear()
    expect(hideLoadingSpy).toHaveBeenCalled()
  })
})
