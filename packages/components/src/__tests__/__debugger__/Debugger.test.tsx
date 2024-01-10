// import * as _extends from '@min-kit/extends'
import { act, fireEvent, render, screen } from '@min-kit/jest'

import Debugger from '../../debugger/ui/debugger'

describe('<Debugger />', () => {
  it('should render <Debugger /> toMatchSnapshot', () => {
    expect(render(<Debugger />).asFragment()).toMatchSnapshot()
  })

  it('should toggle when click button', () => {
    const { container } = render(<Debugger />)
    const panel = container.querySelector('.min-debug-panel')!.parentElement!
    const button = screen.getByText('debugger')

    // initial
    expect(panel.classList.contains('hidden')).toBeTruthy()
    expect(button.classList.contains('hidden')).toBeFalsy()

    // panel visible after click debugger
    act(() => {
      fireEvent.click(button)
    })
    expect(panel.classList.contains('hidden')).toBeFalsy()
    expect(button.classList.contains('hidden')).toBeTruthy()

    // panel hidden after click mask
    act(() => {
      fireEvent.click(panel.querySelector('.mask')!)
    })
    expect(panel.classList.contains('hidden')).toBeTruthy()
    expect(button.classList.contains('hidden')).toBeFalsy()
  })

  it('should dispatch onMove event correctly', () => {
    const onMove = jest.fn()
    render(<Debugger onMove={onMove} />)
    const button = screen.getByText('debugger')
    act(() => {
      const event = new CustomEvent('change', { detail: { x: 1, y: 1 } })
      fireEvent(button, event)
    })
    expect(onMove).toHaveBeenCalledWith({ x: 1, y: 1 })
  })
})
