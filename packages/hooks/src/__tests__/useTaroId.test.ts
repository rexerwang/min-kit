import { renderHook } from '@min-kit/jest'

import { useTaroId } from '../useTaroId'

describe('useTaroId', () => {
  it('should useTaroId did work', () => {
    expect(renderHook(useTaroId).result.current).toMatch(/^taro/)
  })
})
