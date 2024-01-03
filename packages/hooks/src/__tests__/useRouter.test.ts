import { renderHook } from '@min-kit/jest'
import Taro from '@tarojs/taro'

import { useRouter, useRouterParams } from '../useRouter'

describe('useRouter', () => {
  beforeEach(() => {
    jest.spyOn(Taro, 'useRouter').mockImplementation(
      jest.fn().mockReturnValue({
        path: '/pages/index/index',
        params: { utm_source: 'foo', utm_medium: 'bar', q: 'https%3A%2F%2Ffoo.bar.com%2Fa%2Fb%3Fc%3D1', nil: null },
        scene: 1011,
      }),
    )
  })

  it('should useRouter did work', () => {
    const { result } = renderHook(useRouter)
    expect(result.current).toEqual({
      path: '/pages/index/index',
      params: {
        utm_source: 'foo',
        utm_medium: 'bar',
        utm: {
          source: 'foo',
          medium: 'bar',
        },
        q: 'https://foo.bar.com/a/b?c=1',
        nil: null,
      },
      scene: 1011,
    })
  })

  it('should useRouterParams did work', () => {
    const { result } = renderHook(useRouterParams)
    expect(result.current).toEqual({
      utm_source: 'foo',
      utm_medium: 'bar',
      utm: {
        source: 'foo',
        medium: 'bar',
      },
      q: 'https://foo.bar.com/a/b?c=1',
      nil: null,
    })
  })
})
