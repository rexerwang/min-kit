import '@testing-library/jest-dom'

import TestUtils from '@tarojs/test-utils-react'

export const createTaroTestUtils = () => {
  const testUtils = new TestUtils()
  return Object.assign(testUtils, { unmount: testUtils.unmout })
}

export const spyOnConsole = (
  spy: { error?: boolean; warn?: boolean; info?: boolean; debug?: boolean } | true = true,
) => {
  const spyMethods = spy === true ? { error: true, warn: true, info: true, debug: true } : spy

  return Object.keys(spyMethods).reduce(
    (spies, method) => {
      spies[method] = jest.spyOn(console, method as any).mockImplementation(jest.fn())
      return spies
    },
    {} as Record<'error' | 'warn' | 'info' | 'debug', jest.SpyInstance<Console>>,
  )
}

export * from '@testing-library/react'
