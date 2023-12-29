import { createTaroTestUtils, render } from '@min-kit/jest'

describe('<MinImage />', () => {
  const previewImageStub = jest.fn()

  jest.doMock('@tarojs/taro', () => ({
    previewImage: previewImageStub,
  }))

  it('should render <MinImage /> toMatchSnapshot', async () => {
    // @ts-ignore
    const { MinImage } = await import('../image')
    const { asFragment } = render(<MinImage className='image' src='./test.jpg' />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should styling with load status', async () => {
    // @ts-ignore
    const { MinImage } = await import('../image')
    const taro = createTaroTestUtils()
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

  it('should previewImage by click after loaded', async () => {
    const onClick = jest.fn()
    const onLoad = jest.fn()

    // @ts-ignore
    const { MinImage } = await import('../image')

    const taro = createTaroTestUtils()
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
    expect(previewImageStub).toHaveBeenCalledWith({ urls: ['./test.jpg'] })

    taro.unmount()
  })
})
