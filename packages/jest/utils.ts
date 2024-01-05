import '@testing-library/jest-dom'

import TestUtils from '@tarojs/test-utils-react'

export * from '@testing-library/react'

export const createTaroTestUtils = () => {
  const testUtils = new TestUtils()
  return Object.assign(testUtils, { unmount: testUtils.unmout })
}

type SpyConsole = jest.SpyInstance<Console>
type SpyConsoleMethod = 'error' | 'warn' | 'info' | 'log' | 'debug'
export function spyOnConsole(): Record<SpyConsoleMethod, SpyConsole>
export function spyOnConsole(method: SpyConsoleMethod): SpyConsole
export function spyOnConsole(method?: SpyConsoleMethod) {
  const spyOn = (m: any): SpyConsole => jest.spyOn(console, m).mockImplementation(jest.fn())

  if (method) return spyOn(method)

  return ['error', 'warn', 'info', 'log', 'debug'].reduce((spies, m) => {
    spies[m] = spyOn(m)
    return spies
  }, {})
}
