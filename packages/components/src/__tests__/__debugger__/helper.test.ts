import { prettyJSON, timing } from '../../debugger/helper'

describe('helper', () => {
  it('prettyJSON', () => {
    expect(prettyJSON(null)).toBeNull()
    expect(prettyJSON('null')).toBe('null')
    expect(prettyJSON({ a: 'a' })).toBe(`{
  "a": "a"
}`)
  })

  it('timing', () => {
    expect(timing(333)).toBe('333ms')
    expect(timing(3333)).toBe('3.33s')
    expect(timing(333333)).toBe('5.56m')
  })
})
