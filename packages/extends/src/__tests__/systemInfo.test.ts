import { spyOnConsole } from '@min-kit/jest'
import Taro from '@tarojs/taro'

describe('systemInfo', () => {
  spyOnConsole('error') // disable error

  it('should SystemInfo toMatchSnapshot when getSystemInfo successfully', async () => {
    const { SystemInfo } = await import('../systemInfo')
    expect(SystemInfo).toMatchSnapshot()
  })

  it('should the default SystemInfo toMatchSnapshot when getSystemInfo failed', async () => {
    jest.spyOn(Taro, 'getSystemInfoSync').mockImplementation(jest.fn().mockReturnValue(null))
    jest.spyOn(Taro, 'getMenuButtonBoundingClientRect').mockImplementation(jest.fn().mockReturnValue(null))

    await jest.isolateModulesAsync(async () => {
      const { SystemInfo } = await import('../systemInfo')
      expect(SystemInfo).toMatchSnapshot()
    })
  })
})
