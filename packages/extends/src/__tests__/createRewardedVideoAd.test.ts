import { sleep } from '@min-kit/shared'
import Taro, { eventCenter } from '@tarojs/taro'

import { logger } from '../logger'

const adUnitId = 'Mock#adUnitId'
const eventName = 'Mock#RewardedVideoAdOnClose'

describe('createRewardedVideoAd', () => {
  const createRewardedVideoAdSpy = jest.spyOn(Taro, 'createRewardedVideoAd')

  afterEach(() => {
    createRewardedVideoAdSpy.mockReset()
  })

  it('should initialize RewardedVideoAd with events registered', async () => {
    const onErrorStub = jest.fn(),
      onLoadStub = jest.fn(),
      onCloseStub = jest.fn()

    createRewardedVideoAdSpy.mockImplementation(
      jest.fn().mockReturnValue({
        onError: onErrorStub,
        onLoad: onLoadStub,
        onClose: onCloseStub,
      }),
    )

    const { createRewardedVideoAd } = await import('../createRewardedVideoAd')

    createRewardedVideoAd(adUnitId)
    expect(createRewardedVideoAdSpy).toHaveBeenCalledWith({ adUnitId })
    expect(onErrorStub).toHaveBeenCalledWith(expect.any(Function))
    expect(onLoadStub).toHaveBeenCalledWith(expect.any(Function))
    expect(onCloseStub).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should delegate events of RewardedVideoAd', async () => {
    createRewardedVideoAdSpy.mockImplementation(
      jest.fn().mockReturnValue({
        onError: (cb) => cb(),
        onLoad: (cb) => cb(),
        onClose: jest.fn(),
      }),
    )

    const errorSpy = jest.spyOn(logger, 'error').mockImplementation(jest.fn())
    const debugSpy = jest.spyOn(logger, 'debug').mockImplementation(jest.fn())

    const { createRewardedVideoAd } = await import('../createRewardedVideoAd')

    createRewardedVideoAd(adUnitId)
    expect(errorSpy).toHaveBeenCalled()
    expect(debugSpy).toHaveBeenCalled()
  })

  it('should show ad and return result = true after closed with retry', async () => {
    const loadStub = jest.fn().mockResolvedValue({}),
      showStub = jest.fn().mockRejectedValueOnce('show failed')

    createRewardedVideoAdSpy.mockImplementation(
      jest.fn().mockReturnValue({
        onError: jest.fn(),
        onLoad: jest.fn(),
        onClose(cb: any) {
          eventCenter.once(eventName, () => cb({ isEnded: true }))
        },
        load: loadStub,
        show: showStub,
      }),
    )

    await jest.isolateModulesAsync(async () => {
      const { createRewardedVideoAd } = await import('../createRewardedVideoAd')

      const RewardedVideoAd = createRewardedVideoAd(adUnitId)

      const showPromise = RewardedVideoAd.showOnce()
      await sleep(0).then(() => eventCenter.trigger(eventName)) // waitFor show pending
      expect(await showPromise).toBeTruthy()
      expect(loadStub).toHaveBeenCalledTimes(1)
      expect(showStub).toHaveBeenCalledTimes(2)
      expect(await RewardedVideoAd.showOnce()).toBeTruthy()
    })
  })

  it('should just return result = true when ad load failed', async () => {
    const loadStub = jest.fn().mockRejectedValue('load failed'),
      showStub = jest.fn().mockRejectedValue('show failed')

    createRewardedVideoAdSpy.mockImplementation(
      jest.fn().mockReturnValue({
        onError: jest.fn(),
        onLoad: jest.fn(),
        onClose: jest.fn(),
        load: loadStub,
        show: showStub,
      }),
    )

    await jest.isolateModulesAsync(async () => {
      const { createRewardedVideoAd } = await import('../createRewardedVideoAd')

      const RewardedVideoAd = createRewardedVideoAd(adUnitId)
      expect(await RewardedVideoAd.show()).toBeTruthy()
      expect(loadStub).toHaveBeenCalledTimes(1)
      expect(showStub).toHaveBeenCalledTimes(1)
    })
  })
})
