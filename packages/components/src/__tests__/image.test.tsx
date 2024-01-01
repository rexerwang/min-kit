import { createTaroTestUtils, render } from '@min-kit/jest'
import Taro from '@tarojs/taro'

describe('<MinImage />', () => {
  const taro = createTaroTestUtils()

  it('should render <MinImage /> toMatchSnapshot', async () => {
    const { MinImage } = await import('../image/index')
    const { asFragment } = render(<MinImage className='image' src='./test.jpg' />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should styling with load status', async () => {
    const { MinImage } = await import('../image/index')
    await taro.mount(MinImage, { props: { className: 'image', src: './test.jpg', preview: true } })

    const el: HTMLElement = await taro.queries.waitForQuerySelector('.image')
    expect(el.classList.contains('min-image--load')).toBeTruthy()

    await taro.act(() => {
      taro.fireEvent.error(el)
    })
    expect(el.classList.contains('min-image--error')).toBeTruthy()

    await taro.act(() => {
      taro.fireEvent.load(el)
    })
    expect(el.classList.contains('min-image--load')).toBeFalsy()
    expect(el.classList.contains('min-image--error')).toBeFalsy()

    taro.unmount()
  })

  it('should previewImage by click after loaded when given `preview` = true', async () => {
    const onClick = jest.fn()
    const onLoad = jest.fn()
    const previewImageSpy = jest.spyOn(Taro, 'previewImage')

    const { MinImage } = await import('../image/index')

    await taro.mount(MinImage, { props: { className: 'image', src: './test.jpg', preview: true, onClick, onLoad } })
    const el = await taro.queries.waitForQuerySelector('.image')

    await taro.act(() => {
      taro.fireEvent.load(el)
    })
    expect(onLoad).toHaveBeenCalled()

    await taro.act(() => {
      taro.fireEvent.click(el)
    })

    expect(onClick).toHaveBeenCalled()
    expect(previewImageSpy).toHaveBeenCalledWith({ urls: ['./test.jpg'] })

    taro.unmount()
  })

  it('should previewImage by click after loaded when given `preview` = string[]', async () => {
    const onClick = jest.fn()
    const onLoad = jest.fn()
    const previewImageSpy = jest.spyOn(Taro, 'previewImage')

    const { MinImage } = await import('../image/index')

    await taro.mount(MinImage, {
      props: { className: 'image', src: './test.jpg', preview: ['./test.jpg', './test2.jpg'], onClick, onLoad },
    })
    const el = await taro.queries.waitForQuerySelector('.image')

    await taro.act(() => {
      taro.fireEvent.load(el)
    })
    expect(onLoad).toHaveBeenCalled()

    await taro.act(() => {
      taro.fireEvent.click(el)
    })

    expect(onClick).toHaveBeenCalled()
    expect(previewImageSpy).toHaveBeenCalledWith({ current: './test.jpg', urls: ['./test.jpg', './test2.jpg'] })
  })
})
