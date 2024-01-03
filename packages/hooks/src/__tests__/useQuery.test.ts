import { act, renderHook, waitFor } from '@min-kit/jest'

import { useQuery } from '../useQuery'

describe('useQuery', () => {
  it('should useQuery did work', async () => {
    const data = { foo: 'bar' }
    const error = new Error('foo-bar')
    const fn = jest.fn().mockResolvedValue(data).mockRejectedValueOnce(error)
    const { result } = renderHook(useQuery, { initialProps: fn })

    // initial state
    expect(result.current).toEqual({
      query: expect.any(Function),
      loading: false,
      loaded: false,
      data: undefined,
      error: undefined,
    })

    // 1st query to rejected
    act(() => {
      result.current.query()
    })
    expect(fn).toHaveBeenCalledTimes(1)

    expect(result.current.loading).toBeTruthy()
    await waitFor(() => {
      expect(result.current.loading).toBeFalsy()
    })

    expect(result.current.error).toBe(error)
    expect(result.current.data).toBeUndefined()

    // 2nd query to resolved
    await act(() => result.current.query())
    expect(fn).toHaveBeenCalledTimes(2)
    expect(result.current.error).toBeUndefined()
    expect(result.current.data).toEqual(data)

    // 3rd query
    act(() => {
      result.current.query()
    })
    // 4th query to skip when loading
    act(() => {
      result.current.query()
    })
    expect(fn).toHaveBeenCalledTimes(3)
  })
})
