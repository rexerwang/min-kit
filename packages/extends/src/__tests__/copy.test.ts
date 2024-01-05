import { spyOnConsole } from '@min-kit/jest'
import Taro from '@tarojs/taro'

describe('copy', () => {
  const setClipboardDataSpy = jest.spyOn(Taro, 'setClipboardData')
  const errorSpy = spyOnConsole('error')

  afterEach(() => {
    setClipboardDataSpy.mockClear()
    errorSpy.mockClear()
  })

  it('should not copy when given empty input', async () => {
    const { copy } = await import('../copy')
    await expect(copy(null)).resolves.toBeFalsy()
    expect(setClipboardDataSpy).not.toHaveBeenCalled()
  })

  it('should copy when given not empty input', async () => {
    const { copy } = await import('../copy')

    await expect(copy('test')).resolves.toBeTruthy()
    expect(setClipboardDataSpy).toHaveBeenCalledWith({ data: 'test' })

    await copy({ test: 'test' })
    expect(setClipboardDataSpy).toHaveBeenLastCalledWith({ data: '{"test":"test"}' })
  })

  it('should copy failed when given api thrown', async () => {
    setClipboardDataSpy.mockImplementation(jest.fn().mockRejectedValue(new Error('copy')))
    const { copy } = await import('../copy')
    await expect(copy('test')).resolves.toBeFalsy()
    expect(errorSpy).toHaveBeenCalled()
  })
})
