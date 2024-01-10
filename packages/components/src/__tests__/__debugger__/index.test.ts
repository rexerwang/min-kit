import { MinDebugger } from '../../debugger'

describe('index', () => {
  it('should export MinDebugger', async () => {
    expect(typeof MinDebugger).toBe('function')
    expect(typeof MinDebugger.use).toBe('function')
  })
})
