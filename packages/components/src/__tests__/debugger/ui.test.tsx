import { createTaroTestUtils, render } from '@min-kit/jest'

import Debugger from '../../debugger/ui/debugger'

jest.mock('@tarojs/taro', () => ({
  canIUse: jest.fn(),
  setStorage: jest.fn(),
  getCurrentPages: jest.fn().mockReturnValue([{ route: 'pages/index/index', options: {} }]),
}))

jest.mock('@min-kit/extends', () => {
  // disable console
  console.error = console.debug = jest.fn()

  return {
    ...jest.requireActual('@min-kit/extends'),
    hasNavBar: () => false,
    hasTabBar: () => false,
  }
})

describe('debugger.ui', () => {
  const taro = createTaroTestUtils()

  it('should render <Debugger /> toMatchSnapshot', async () => {
    const { asFragment } = render(<Debugger />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render Panel when tabs clicked', async () => {
    await taro.mount(Debugger)

    await taro.act(() => {
      taro.fireEvent.click(taro.queries.querySelector('.movable-view'))
    })

    expect(taro.queries.querySelector('.movable-view.hidden')).not.toBeNull()
    expect(taro.queries.querySelector('.NetworkPanel')).not.toBeNull()

    const tabs: HTMLElement[] = await taro.queries.waitForQuerySelectorAll('.tab')
    expect(tabs.length).toBe(3)

    await taro.act(() => taro.fireEvent.click(tabs[1]))
    expect(taro.queries.querySelector('.AppPanel')).not.toBeNull()

    await taro.act(() => taro.fireEvent.click(tabs[2]))
    expect(taro.queries.querySelector('.StatusPanel')).not.toBeNull()

    taro.unmount()
  })
})