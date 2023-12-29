import TestUtils from '@tarojs/test-utils-react'

export const createTaroTestUtils = () => {
  const testUtils = new TestUtils()
  return Object.assign(testUtils, { unmount: testUtils.unmout })
}

export const spyOnConsole = (methods = ['error', 'warn', 'info', 'debug']) =>
  methods.map((method: any) => {
    const spy = jest.spyOn(console, method)
    spy.mockImplementation(jest.fn())
    return spy
  })

export * from '@testing-library/react'
