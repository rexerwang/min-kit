import { render } from '@min-kit/jest'

import { MinIcon } from '../icon'

describe('<MinIcon />', () => {
  MinIcon.load({ test: '/test.jpg' })

  it('should render <MinIcon /> toMatchSnapshot', () => {
    const { asFragment } = render(<MinIcon className='test' name='test' />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render <MinIcon.Font /> toMatchSnapshot', () => {
    const { asFragment } = render(<MinIcon.Font className='test' name='test' />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should load icons correctly', () => {
    MinIcon.load({ test: '/a.jpg', b: '/b.jpg' })
    expect(MinIcon.configs).toEqual({ test: '/a.jpg', b: '/b.jpg' })
  })
})
