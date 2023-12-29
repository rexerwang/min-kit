import { Route } from '../route'

describe('route helper specs', () => {
  it('Route.ensure', () => {
    expect(Route.ensure('a/b')).toBe('/a/b')
    expect(Route.ensure('/a/b')).toBe('/a/b')
  })

  it('Route.generate', () => {
    expect(Route.generate('a/b', 'c=c')).toBe('/a/b?c=c')
    expect(Route.generate('a/b', { c: 'c' })).toBe('/a/b?c=c')
    expect(Route.generate('a/b/c')).toBe('/a/b/c')
  })

  it('Route.parse', () => {
    expect(Route.parse('/a/b?c=c')).toEqual({ path: '/a/b', query: { c: 'c' } })
    expect(Route.parse('a/b/c')).toEqual({ path: '/a/b/c', query: {} })
  })

  it('Route.extract', () => {
    expect(Route.extract('a/b?c=c')).toBe('/a/b')
  })

  it('Route.equals', () => {
    expect(Route.equals('a/b?c=c', '/a/b?a=123')).toBeTruthy()
    expect(Route.equals('a/b?c=c', '/a/b/c?a=123')).toBeFalsy()
  })

  it('Route.includes', () => {
    expect(Route.includes('a/b?c=c', '/a/b/c?a=123')).toBeTruthy()
    expect(Route.includes('/a/b/?c=c', 'a/b/c?a=123')).toBeTruthy()
    expect(Route.includes('/a/c/?c=c', 'a/b/c?a=123')).toBeFalsy()
    expect(Route.includes('a/ab?c=c', '/a/abc/d?a=123')).toBeFalsy()
  })
})
