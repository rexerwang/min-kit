import { renderHook } from '@min-kit/jest'
import { eventCenter } from '@tarojs/taro'

import { createEventListener } from '../createEventListener'

describe('createEventListener', () => {
  it('should create useEventListener hook by Taro.eventCenter', () => {
    const useEventListener = createEventListener('TestEventName')

    const listener = jest.fn()
    const { unmount } = renderHook(useEventListener, { initialProps: listener })

    eventCenter.trigger('TestEventName', 1)
    expect(listener).toHaveBeenCalledWith(1)

    unmount()
    eventCenter.trigger('TestEventName', 2)
    expect(listener).toHaveBeenCalledTimes(1)
  })
})
