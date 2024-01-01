import { spyOnConsole } from '@min-kit/jest'
import Taro from '@tarojs/taro'

jest.useFakeTimers({ now: 0 })
const TIME = '00:00:00.000'
const NAME = 'NAME_FOR_TEST'

describe('Logger', () => {
  const consoleSpy = spyOnConsole()
  const getSystemInfoSyncSpy = jest.spyOn(Taro, 'getSystemInfoSync')

  const realtimeLogManagerStub = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    setFilterMsg: jest.fn(),
    addFilterMsg: jest.fn(),
    in: jest.fn(),
  }

  const logManagerStub = {
    info: jest.fn(),
    warn: jest.fn(),
  }

  beforeEach(() => {
    jest.spyOn(Taro, 'canIUse').mockImplementation(() => true)
    jest.spyOn(Taro, 'getRealtimeLogManager').mockImplementation(() => realtimeLogManagerStub as any)
    jest.spyOn(Taro, 'getLogManager').mockImplementation(() => logManagerStub as any)
    getSystemInfoSyncSpy.mockImplementation(jest.fn().mockReturnValue({ platform: 'ios' }))
  })

  afterEach(() => {
    Object.values(consoleSpy).forEach((spy) => spy.mockClear())
    Object.values(realtimeLogManagerStub).forEach((spy) => spy.mockClear())
    Object.values(logManagerStub).forEach((spy) => spy.mockClear())
    getSystemInfoSyncSpy.mockReset()
  })

  it('should instance with default option', async () => {
    const { getLogger } = await import('../logger/index.ts')
    getLogger(NAME)
    expect(consoleSpy.debug).toHaveBeenCalledWith(TIME, NAME, '[Logger]', {
      reporter: { feedback: true, realtime: true },
      timestamp: true,
      meta: true,
    })
  })

  it('should instance with default option when given platform is Devtools', async () => {
    getSystemInfoSyncSpy.mockImplementation(jest.fn().mockReturnValue({ platform: 'devtools' }))

    await jest.isolateModulesAsync(async () => {
      const { getLogger } = await import('../logger/index.ts')
      getLogger(NAME)
      expect(consoleSpy.debug).toHaveBeenCalledWith(NAME, '[Logger]', {
        reporter: { feedback: false, realtime: false },
        timestamp: false,
        meta: true,
      })
    })
  })

  it('should update options via `setOption`', async () => {
    const { getLogger } = await import('../logger/index.ts')
    const logger = getLogger(NAME)
    logger.setOption({ timestamp: false, meta: false, reporter: { feedback: false, realtime: false } })
    expect(consoleSpy.debug).toHaveBeenCalledWith(NAME, '[Logger]', {
      reporter: { feedback: false, realtime: false },
      timestamp: false,
      meta: false,
    })
  })

  it.each(['debug', 'info', 'warn', 'error'])('should output %s formatted message & report', async (level) => {
    const { getLogger } = await import('../logger/index.ts')

    const customStub = jest.fn()
    const logger = getLogger(NAME, {
      reporter: {
        realtime: true,
        feedback: true,
        custom: customStub,
      },
    })

    const reporter = logger[level]('#tag', 'message', { level })
    expect(consoleSpy[level]).toHaveBeenCalledWith(TIME, NAME, '[tag]', 'message', { level })

    reporter?.report()
    // if (level === 'debug') {
    //   expect(customStub).not.toHaveBeenCalled()
    // }

    // const realtime = realtimeLogManagerStub[level]
    // if (realtime) expect(realtime).toHaveBeenCalled()
  })

  it('should output with formatted RequestError message', async () => {
    const { getLogger } = await import('../logger/index.ts')
    const { RequestError } = await import('../request/RequestError.ts')
    const error = new RequestError(new Error('test'), { request: {} } as any)
    getLogger(NAME).error(error)

    const normalized = error.normalize()
    expect(consoleSpy.error).toHaveBeenCalledWith(TIME, NAME, normalized, 'request:', error.normalize().request)
  })

  it('should index exports correctly', async () => {
    const { logger } = await import('../logger/index.ts')
    const { Logger } = await import('../logger/Logger.ts')

    expect(logger).toBeInstanceOf(Logger)
  })
})
