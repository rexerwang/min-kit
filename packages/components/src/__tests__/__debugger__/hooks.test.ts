import { renderHook, spyOnConsole } from '@min-kit/jest'

import * as debuggers from '../../debugger/ui/debugger'
import * as portals from '../../portal'

describe('debugger/hooks', () => {
  let portalSpy: jest.SpyInstance, debuggerSpy: jest.SpyInstance

  beforeEach(() => {
    spyOnConsole()

    portalSpy = jest.spyOn(portals, 'mountPortal').mockImplementation(jest.fn())
    debuggerSpy = jest.spyOn(debuggers, 'default').mockImplementation(jest.fn())

    jest.doMock('@min-kit/hooks', () => ({
      useAppRoute__unstable: (cb) => cb(),
      useAppRouteDone__unstable: (cb) => cb(),
      useMount: jest.fn(),
    }))
  })

  it('should render useMinDebugger correctly with given enableDebug = true', async () => {
    jest.doMock('@min-kit/extends', () => ({
      getRootElement: jest.fn().mockReturnValue({ uid: 'mock-uid' }),
      SystemInfo: { enableDebug: true },
    }))

    // @ts-ignore
    const { useMinDebugger } = await import('../../debugger/hooks/useMinDebugger')
    renderHook(() => useMinDebugger({}))
    expect(portalSpy).toHaveBeenCalledWith(
      debuggerSpy,
      expect.objectContaining({
        onMove: expect.any(Function),
        options: {},
      }),
    )
  })

  it('should render useMinDebugger correctly with given enableDebug = false', async () => {
    jest.doMock('@min-kit/extends', () => ({
      getRootElement: jest.fn(),
      SystemInfo: { enableDebug: false },
    }))

    // @ts-ignore
    const { useMinDebugger } = await import('../../debugger/hooks/useMinDebugger')
    renderHook(() => useMinDebugger({}))
    expect(portalSpy).not.toHaveBeenCalled()
  })
})
