import { spyOnConsole } from '@min-kit/jest'

import { attempt } from '../attempt'

describe('attempt', () => {
  const { error: errorSpy } = spyOnConsole({ error: true })
  const error = new Error()

  it('attempt', () => {
    const fn = (flag) => {
      if (!flag) throw error
      return flag
    }

    expect(attempt(fn, 0)).toBeUndefined()
    expect(errorSpy).toHaveBeenCalledWith(error)

    expect(attempt(fn, 1)).toBe(1)
  })

  it('attempt.async', async () => {
    const fn = (flag) =>
      new Promise((resolve, reject) => {
        if (flag) resolve(flag)
        else reject(error)
      })

    await expect(attempt.async(fn, 0)).resolves.toBeUndefined()
    expect(errorSpy).toHaveBeenCalledWith(error)

    await expect(attempt.async(fn, 1)).resolves.toBe(1)
  })
})
