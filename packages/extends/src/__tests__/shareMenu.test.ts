import Taro from '@tarojs/taro'

import { logger } from '../logger'

describe('shareMenu', () => {
  jest.spyOn(logger, 'error').mockImplementation(jest.fn())

  it('should showShareMenu correctly', async () => {
    const showShareMenuSpy = jest.spyOn(Taro, 'showShareMenu').mockImplementation(jest.fn().mockResolvedValue({}))

    const { showShareMenu } = await import('../shareMenu')
    showShareMenu()

    expect(showShareMenuSpy).toHaveBeenCalledWith({ showShareItems: ['shareAppMessage', 'shareTimeline'] })
  })

  it('should not throw an exception when called showShareMenu failed', async () => {
    jest.spyOn(Taro, 'showShareMenu').mockImplementation(jest.fn().mockRejectedValue('failed'))
    const { showShareMenu } = await import('../shareMenu')
    expect(showShareMenu).not.toThrow()
  })

  it('should hideShareMenu correctly', async () => {
    const hideShareMenuSpy = jest.spyOn(Taro, 'hideShareMenu').mockImplementation(jest.fn().mockResolvedValue({}))

    const { hideShareMenu } = await import('../shareMenu')
    hideShareMenu()

    expect(hideShareMenuSpy).toHaveBeenCalled()
  })

  it('should not throw an exception when called hideShareMenu failed', async () => {
    jest.spyOn(Taro, 'hideShareMenu').mockImplementation(jest.fn().mockRejectedValue('failed'))
    const { hideShareMenu } = await import('../shareMenu')
    expect(hideShareMenu).not.toThrow()
  })
})
