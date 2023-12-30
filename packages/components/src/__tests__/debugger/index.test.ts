import { spyOnConsole } from '@min-kit/jest'

jest.mock('@tarojs/taro', () => ({
  canIUse: jest.fn(),
}))

describe('debugger/index', () => {
  beforeAll(() => {
    spyOnConsole()
  })

  it('should export MinDebugger correctly', async () => {
    // @ts-ignore
    const { MinDebugger } = await import('../../debugger/index')

    expect(typeof MinDebugger).toBe('function')
    expect(typeof MinDebugger.use).toBe('function')
  })
})
