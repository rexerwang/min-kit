import { render, renderHook } from '@min-kit/jest'
import Taro from '@tarojs/taro'

describe('share', () => {
  it('should render <ShareButton /> toMatchSnapshot', async () => {
    const { ShareButton } = await import('../share/index.ts')
    expect(render(<ShareButton>share</ShareButton>).asFragment()).toMatchSnapshot()
  })

  it('should shareAppMessage via ShareButton', async () => {
    jest.spyOn(Taro, 'useShareTimeline').mockImplementation(jest.fn())
    const useShareAppMessageSpy = jest.spyOn(Taro, 'useShareAppMessage').mockImplementation(jest.fn())

    const { useShareMessage, ShareButton } = await import('../index.ts')

    const Index = () => {
      useShareMessage()
      return (
        <ShareButton message={{ title: 'test' }} onShare={jest.fn()}>
          ShareButton
        </ShareButton>
      )
    }

    render(<Index />)

    expect(useShareAppMessageSpy).toHaveBeenCalled()
  })

  it('should shareAppMessage via menu', async () => {
    let message: any = null
    jest.spyOn(Taro, 'useShareTimeline').mockImplementation(jest.fn())
    jest.spyOn(Taro, 'useShareAppMessage').mockImplementation((cb) => {
      message = cb({ from: 'menu' })
    })

    const { useShareMessage } = await import('../index.ts')

    renderHook(() => useShareMessage({ message: { title: 'test' } }))

    expect(message).toEqual({ title: 'test' })
  })

  it('should shareTimeline via menu', async () => {
    let message: any = null
    jest.spyOn(Taro, 'useShareAppMessage').mockImplementation(jest.fn())
    jest.spyOn(Taro, 'useShareTimeline').mockImplementation((cb) => {
      message = cb()
    })

    const { useShareMessage } = await import('../index.ts')

    renderHook(() => useShareMessage({ timeline: { title: 'test' } }))

    expect(message).toEqual({ title: 'test' })
  })
})
