import { act, renderHook } from '@min-kit/jest'
import Taro from '@tarojs/taro'

import { useAppScene } from '../useAppScene'

let onAppShowCb: any = null
jest.spyOn(Taro, 'onAppShow').mockImplementation((cb) => {
  onAppShowCb = cb
})
jest.spyOn(Taro, 'getEnterOptionsSync').mockImplementation(jest.fn().mockReturnValue({ scene: 1001 }))

describe('useAppScene', () => {
  it('should get latest scene value', () => {
    const { result } = renderHook(useAppScene)
    expect(result.current).toBe(1001)

    act(() => {
      onAppShowCb({})
    })
    expect(result.current).toBe(1001)

    act(() => {
      onAppShowCb({ scene: 1007 })
    })
    expect(result.current).toBe(1007)
  })
})
