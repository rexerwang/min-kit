import { defineProperty } from '../object'

describe('object', () => {
  it('defineProperty: should defineProperty correctly', () => {
    const spy = jest.spyOn(Object, 'defineProperty')
    const object: any = {}
    const value = jest.fn()
    defineProperty(object, 'test', { value })
    expect(spy).toHaveBeenCalledWith(object, 'test', { enumerable: true, value })
  })
})
