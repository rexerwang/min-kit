import { renderHook, spyOnConsole } from '@min-kit/jest'

import * as debuggers from '../../debugger/ui/debugger'
import * as portals from '../../portal'

jest.mock('@tarojs/taro', () => ({
  ...jest.requireActual('@tarojs/taro'),
  canIUse: jest.fn(),
  nextTick: (cb) => cb(),
}))

jest.mock('@min-kit/extends', () => ({
  hasNavBar: () => true,
  hasTabBar: () => true,
  getRootElement: jest.fn().mockReturnValue({ uid: 'mock-uid' }),
  SystemInfo: { enableDebug: false },
}))

jest.mock('@min-kit/hooks', () => ({
  useAppRoute__unstable: (cb) => cb(),
  useAppRouteDone__unstable: (cb) => cb(),
  useMount: (cb) => cb(),
}))

describe('debugger/hooks disable', () => {
  beforeAll(() => {
    spyOnConsole()
  })

  it('should render useMinDebugger correctly with given enableDebug = false', async () => {
    const portalStub = jest.spyOn(portals, 'mountPortal').mockImplementation(jest.fn())
    jest.spyOn(debuggers, 'default').mockImplementation(jest.fn())

    // @ts-ignore
    const { useMinDebugger } = await import('../../debugger/hooks/useMinDebugger')
    renderHook(() => useMinDebugger({}))

    expect(portalStub).not.toHaveBeenCalled()
  })
})
