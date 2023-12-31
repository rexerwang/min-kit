import { spyOnConsole } from '@min-kit/jest'

import { MinDebugger } from '../../debugger'

describe('debugger/index', () => {
  beforeAll(() => {
    spyOnConsole()
  })

  it('should export MinDebugger correctly', async () => {
    expect(typeof MinDebugger).toBe('function')
    expect(typeof MinDebugger.use).toBe('function')
  })
})
