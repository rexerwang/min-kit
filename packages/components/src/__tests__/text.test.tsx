import { render } from '@min-kit/jest'

import { MinText, renderText } from '../text'

describe('<MinText />', () => {
  it('should render <MinText /> toMatchSnapshot', async () => {
    const { asFragment } = render(<MinText className='test'>text</MinText>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should renderText string toMatchSnapshot', () => {
    const Text = renderText('text', { userSelect: true })
    expect(render(Text).asFragment()).toMatchSnapshot()
  })

  it('should renderText JSX toMatchSnapshot', () => {
    const Text = renderText(<div>text</div>, { userSelect: true })
    expect(render(Text).asFragment()).toMatchSnapshot()
  })
})
