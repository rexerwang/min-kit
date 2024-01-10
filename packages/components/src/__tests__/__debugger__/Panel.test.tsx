import { act, fireEvent, render, screen } from '@min-kit/jest'

import Panel from '../../debugger/ui/panel'

describe('<Panel />', () => {
  it('NetworkPanel should be active', () => {
    render(<Panel onClose={jest.fn()} />)
    const tab = screen.getByText('请求')
    act(() => {
      fireEvent.click(tab)
    })
    expect(tab.classList.contains('active')).toBeTruthy()
  })

  it('should switch to AppPanel when tab click', () => {
    render(<Panel onClose={jest.fn()} />)
    const tab = screen.getByText('应用')
    act(() => {
      fireEvent.click(tab)
    })
    expect(tab.classList.contains('active')).toBeTruthy()
  })

  it('should switch to StatusPanel when tab click', () => {
    render(<Panel onClose={jest.fn()} />)
    const tab = screen.getByText('状态')
    act(() => {
      fireEvent.click(tab)
    })
    expect(tab.classList.contains('active')).toBeTruthy()
  })
})
