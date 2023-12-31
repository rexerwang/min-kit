import { render } from '@min-kit/jest'
import { View } from '@tarojs/components'

import { MinNavigationBar } from '../navigation-bar'

describe('<MinNavigationBar />', () => {
  it('should render <MinNavigationBar /> toMatchSnapshot', async () => {
    const { asFragment } = render(
      <MinNavigationBar className='nav' title='min-kit'>
        <View>MinNavigationBar</View>
      </MinNavigationBar>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('MinNavigationBar.rect', () => {
    expect(MinNavigationBar.rect).toEqual(
      expect.objectContaining({
        height: expect.any(Number),
        width: expect.any(Number),
        top: expect.any(Number),
        bottom: expect.any(Number),
      }),
    )
  })
})
