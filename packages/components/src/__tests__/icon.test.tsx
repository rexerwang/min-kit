import { createTaroTestUtils, render } from '@min-kit/jest'

import { MinIcon } from '../icon'

describe('<MinIcon />', () => {
  const taro = createTaroTestUtils()

  beforeAll(() => {
    MinIcon.load({ test: '/test.jpg' })
  })

  it('should render <MinIcon /> toMatchSnapshot', () => {
    expect(render(<MinIcon className='test' name='test' />).asFragment()).toMatchSnapshot()
    expect(render(<MinIcon name='test' size={[20, 40]} />).asFragment()).toMatchSnapshot()
  })

  it('should render <MinIcon.Font /> toMatchSnapshot', () => {
    const { asFragment } = render(<MinIcon.Font className='test' name='test' />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should MinIcon.Font dispatch click event', async () => {
    const onClick = jest.fn()
    await taro.mount(MinIcon.Font, { props: { name: 'test', onClick } })

    await taro.act(() => {
      taro.fireEvent.click(taro.queries.querySelector('.min-icon-font')!)
    })
    expect(onClick).toHaveBeenCalled()
  })

  it('should load icons correctly', () => {
    MinIcon.load({ test: '/a.jpg', b: '/b.jpg' })
    expect(MinIcon.configs).toEqual({ test: '/a.jpg', b: '/b.jpg' })
  })
})
