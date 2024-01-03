import { renderHook } from '@min-kit/jest'
import Taro from '@tarojs/taro'

import { useAppHide } from '../useAppHide'

const onAppHideSpy = jest.spyOn(Taro, 'onAppHide')
const offAppHideSpy = jest.spyOn(Taro, 'offAppHide')

describe('useAppHide', () => {
  it('should delegate onAppHide safely', () => {
    const { unmount } = renderHook(useAppHide, { initialProps: jest.fn() })
    expect(onAppHideSpy).toHaveBeenCalled()
    unmount()
    expect(offAppHideSpy).toHaveBeenCalled()
  })
})
