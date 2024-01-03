import { act, renderHook } from '@min-kit/jest'
import Taro from '@tarojs/taro'

import { useDidScan } from '../useDidScan'

let useDidShowCb: any = null
jest.spyOn(Taro, 'useDidShow').mockImplementation((cb) => {
  useDidShowCb = cb
})

describe('useDidScan', () => {
  it('should useDidScan did work', () => {
    const cbStub = jest.fn()
    renderHook(useDidScan, { initialProps: cbStub })

    const options = { query: { scancode_time: '#timestamp', q: '#whatever' } }
    act(() => {
      useDidShowCb(options)
    })
    expect(cbStub).toHaveBeenCalledWith(options)
  })
})
