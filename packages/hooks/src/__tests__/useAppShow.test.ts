import { renderHook } from '@min-kit/jest'
import Taro from '@tarojs/taro'

import { useAppShow } from '../useAppShow'

const onAppShowSpy = jest.spyOn(Taro, 'onAppShow')
const offAppShowSpy = jest.spyOn(Taro, 'offAppShow')

describe('useAppShow', () => {
  it('should delegate onAppShow safely', () => {
    const { unmount } = renderHook(useAppShow, { initialProps: jest.fn() })
    expect(onAppShowSpy).toHaveBeenCalled()
    unmount()
    expect(offAppShowSpy).toHaveBeenCalled()
  })
})
