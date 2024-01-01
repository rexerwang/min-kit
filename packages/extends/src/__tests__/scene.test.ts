import { spyOnConsole } from '@min-kit/jest'
import Taro from '@tarojs/taro'

describe('scene', () => {
  const getEnterOptionsSyncSpy = jest.spyOn(Taro, 'getEnterOptionsSync')

  afterEach(() => {
    getEnterOptionsSyncSpy.mockReset()
  })

  it.each([
    ['isFromShare', 1007],
    ['isFromShare', 1008],
    ['isFromQrcode', 1011],
    ['isFromQrcode', 1012],
    ['isFromQrcode', 1013],
    ['isFromSubscription', 1014],
    ['isFromSubscription', 1107],
    ['isSinglePageMode', 1154],
    ['isFromShare', 1155],
  ])('should determine %s when given scene = %p', async (t, v) => {
    getEnterOptionsSyncSpy.mockImplementation(jest.fn().mockReturnValue({ scene: v }))

    await jest.isolateModulesAsync(async () => {
      const { scene } = await import('../scene')
      expect(scene.current).toBe(v)
      expect(scene[t]).toBeTruthy()
    })
  })

  it('should get scene 0 when failed', async () => {
    spyOnConsole({ error: true }) // disable console.error
    getEnterOptionsSyncSpy.mockImplementation(() => {
      throw new Error('test')
    })

    await jest.isolateModulesAsync(async () => {
      const { scene } = await import('../scene')

      expect(scene.current).toBe(0)
    })
  })
})
