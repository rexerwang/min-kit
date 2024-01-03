import { Current, document, logger } from '@min-kit/extends'
import { render, renderHook } from '@min-kit/jest'
import Taro from '@tarojs/taro'

describe('share', () => {
  const useShareTimelineSpy = jest.spyOn(Taro, 'useShareTimeline')
  const useShareAppMessageSpy = jest.spyOn(Taro, 'useShareAppMessage')
  const errorSpy = jest.spyOn(logger, 'error').mockImplementation(jest.fn())

  beforeEach(() => {
    useShareTimelineSpy.mockImplementation(jest.fn())
    useShareAppMessageSpy.mockImplementation(jest.fn())
  })

  afterEach(() => {
    useShareTimelineSpy.mockReset()
    useShareAppMessageSpy.mockReset()
    errorSpy.mockClear()
  })

  it('should shareAppMessage via ShareButton', async () => {
    const messageFake = { title: 'test' }
    let message: any = null

    useShareAppMessageSpy.mockImplementation((cb) => {
      message = cb({ from: 'button', target: { id: 'test_id' } })
    })

    jest
      .spyOn(document, 'getElementById')
      .mockImplementation(jest.fn().mockReturnValue({ props: { openType: 'share', message: messageFake } }))

    const { ShareButton } = await import('../share/button')
    const { useShareMessage } = await import('../share/useShareMessage')

    const Index = () => {
      useShareMessage()
      return (
        <ShareButton message={messageFake} onShare={jest.fn()}>
          ShareButton
        </ShareButton>
      )
    }

    expect(render(<Index />).asFragment()).toMatchSnapshot()
    expect(message).toEqual(messageFake)
  })

  it('should shareAppMessage with default message via ShareButton when not found button element', async () => {
    const messageFake = { title: 'test' }
    let message: any = null

    useShareAppMessageSpy.mockImplementation((cb) => {
      message = cb({ from: 'button', target: { id: 'test_id' } })
    })

    const { ShareButton } = await import('../share/button')
    const { useShareMessage } = await import('../share/useShareMessage')

    const Index = () => {
      useShareMessage()
      return (
        <ShareButton message={messageFake} onShare={jest.fn()}>
          ShareButton
        </ShareButton>
      )
    }

    render(<Index />)
    expect(message).toEqual({})
  })

  it('should shareAppMessage via menu', async () => {
    let message: any = null
    useShareAppMessageSpy.mockImplementation((cb) => {
      message = cb({ from: 'menu' })
    })

    const { useShareMessage } = await import('../share/index')

    const { rerender } = renderHook(useShareMessage, { initialProps: { message: { title: 'test' } } })

    expect(message).toEqual({ title: 'test' })

    rerender({})
    expect(message).toEqual({})
  })

  it('should shareAppMessage with default message via menu when useShareAppMessage has no result', async () => {
    let message: any = null
    useShareAppMessageSpy.mockImplementation((cb) => {
      message = cb({})
    })

    const { useShareMessage } = await import('../share/index')

    renderHook(useShareMessage, { initialProps: { message: { title: 'test' } } })
    expect(message).toEqual({})
  })

  it('should shareTimeline via menu', async () => {
    let message: any = null

    useShareTimelineSpy.mockImplementation((cb) => {
      message = cb()
    })

    const { useShareMessage } = await import('../share/index')

    const { rerender } = renderHook(useShareMessage, { initialProps: { timeline: { title: 'timeline' } } })
    expect(message).toEqual({ title: 'timeline' })

    rerender({ message: { title: 'message' } })
    expect(message).toEqual({ title: 'message' })

    rerender({})
    expect(message).toEqual({})
  })

  it('should output error message when `enableShareAppMessage = false`', async () => {
    jest.replaceProperty(Current, 'page', { config: {} } as any)

    const { useShareMessage } = await import('../share/index')
    renderHook(useShareMessage)

    // expect(errorSpy.mock.lastCall?.at(1)).toMatch(/unset "enableShareAppMessage"/)
    expect(errorSpy).toHaveBeenCalledTimes(1)
  })
})
