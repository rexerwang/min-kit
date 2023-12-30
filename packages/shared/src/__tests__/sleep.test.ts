import { sleep } from '../sleep'

describe('sleep', () => {
  jest.useFakeTimers()

  it('sleep()', () => {
    expect(
      sleep(0)
        .then(() => true)
        .catch(() => false),
    ).resolves.toBeTruthy()
  })
})
