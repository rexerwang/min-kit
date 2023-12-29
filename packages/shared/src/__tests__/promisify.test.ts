import { promisify } from '../promisify'

describe('promisify', () => {
  it('should invoke success callback correctly', async () => {
    const api = jest.fn().mockImplementation(({ success, fail, ...option }) => {
      success(option)
    })
    await expect(promisify(api)({ a: 'a' })).resolves.toEqual({ a: 'a' })
  })

  it('should invoke fail callback correctly', async () => {
    const api = jest.fn().mockImplementation(({ success, fail, ...option }) => {
      fail(option)
    })
    await expect(promisify(api)({ b: 'b' })).rejects.toEqual({ b: 'b' })
  })
})
