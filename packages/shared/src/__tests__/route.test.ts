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
    expect(Route.includes('pages/a/index', 'pages/a/index')).toBeFalsy()
    expect(Route.includes('pages/a/index', 'pages/a/b/index')).toBeTruthy()
    expect(Route.includes('pages/a/b/index', 'pages/a/b/c/index')).toBeTruthy()
    expect(Route.includes('pages/index/index', 'pages/a/b/c/index')).toBeTruthy()

    expect(Route.includes('pages/index/index', 'pages/a/b/c/index', true)).toBeFalsy()
  })
})
