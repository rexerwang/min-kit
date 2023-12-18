import { useState } from 'react'

import { useMemoizedFn } from './useMemoizedFn'

interface Query<P extends any[], R extends any> {
  /** async function */
  query(...args: P): Promise<void>
  /** latest query result */
  data: R | undefined
  /** latest query pending */
  loading: boolean
  /** first query loaded */
  loaded: boolean
  /** latest query error */
  error: Error | undefined
}

/** create Query */
export function useQuery<P extends any[], R extends any>(fn: (...args: P) => Promise<R>): Query<P, R> {
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState<R>()
  const [error, setError] = useState<Error>()

  const query = useMemoizedFn(async (...args: P) => {
    if (loading) return

    setLoading(true)
    try {
      const res: R = await fn(...args)
      setData(res)
      setError(undefined)
    } catch (e) {
      setData(undefined)
      setError(e as Error)
    } finally {
      setLoading(false)
      setLoaded(true)
    }
  })

  return { query, loading, loaded, data, error }
}
