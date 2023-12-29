import { isEmpty, isError, isFunction, isNumber, isPlainObject, isString } from '../is'

describe('is', () => {
  it('isPlainObject', () => {
    expect(isPlainObject({})).toBeTruthy()
    expect(isPlainObject(Object.create(null))).toBeTruthy()
    expect(isPlainObject(new Object())).toBeTruthy()
    expect(isPlainObject(null)).toBeFalsy()
    expect(isPlainObject(undefined)).toBeFalsy()
    expect(isPlainObject(true)).toBeFalsy()
    expect(isPlainObject(1)).toBeFalsy()
    expect(isPlainObject('')).toBeFalsy()
    expect(isPlainObject([])).toBeFalsy()
    expect(isPlainObject(new Map())).toBeFalsy()
    expect(isPlainObject(new Set())).toBeFalsy()
    expect(isPlainObject(() => {})).toBeFalsy()
    expect(isPlainObject(class A {})).toBeFalsy()
    function Fun() {}
    expect(isPlainObject(new Fun())).toBeFalsy()
  })

  it('isString', () => {
    expect(isString('1')).toBeTruthy()
    expect(isString(1)).toBeFalsy()
  })

  it('isNumber', () => {
    expect(isNumber(1)).toBeTruthy()
    expect(isNumber('1')).toBeFalsy()
    expect(isNumber(Number('a'))).toBeFalsy()
  })

  it('isFunction', () => {
    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction(class Test {})).toBeTruthy()
    expect(isFunction({})).toBeFalsy()
  })

  it('isError', () => {
    expect(isError(new Error(''))).toBeTruthy()
    class TestError extends Error {}
    expect(isError(new TestError(''))).toBeTruthy()
    expect(isError(Object.assign(new Error(''), { code: 1 }))).toBeTruthy()
    expect(isError({ message: '' })).toBeFalsy()
  })

  it('isEmpty', () => {
    expect(isEmpty({})).toBeTruthy()
    expect(isEmpty([])).toBeTruthy()
    expect(isEmpty(null)).toBeTruthy()
    expect(isEmpty(undefined)).toBeTruthy()
    expect(isEmpty('')).toBeTruthy()
    expect(isEmpty(new Map())).toBeTruthy()
    expect(isEmpty(new Set())).toBeTruthy()
    expect(isEmpty(Object.create(null))).toBeTruthy()
    expect(isEmpty(() => {})).toBeTruthy()
    expect(isEmpty(new Function())).toBeTruthy()

    expect(isEmpty({ a: 1 })).toBeFalsy()
    expect(isEmpty([1])).toBeFalsy()
    expect(isEmpty(1)).toBeFalsy()
    expect(isEmpty(0)).toBeFalsy()
    expect(isEmpty(true)).toBeFalsy()
    expect(isEmpty(false)).toBeFalsy()
    expect(isEmpty('1')).toBeFalsy()
  })
})
