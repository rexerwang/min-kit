import { px } from '../px'

describe('px', () => {
  it('px()', () => {
    expect(px(1)).toBe('1px')
  })

  it('px.of()', () => {
    expect(px.of({ width: 1, height: 2 })).toEqual({ width: '1px', height: '2px' })
  })
})
