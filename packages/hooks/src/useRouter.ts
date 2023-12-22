import { UTM } from '@min-kit/shared'
import { useRouter as useTaroRouter } from '@tarojs/taro'
import { useMemo } from 'react'

type Params<RequiredKeys extends string, OptionalKeys extends string> = {
  [k in OptionalKeys]?: string | undefined
} & {
  [k in RequiredKeys]: string
}

export function useRouter<
  RequiredKeys extends string = string,
  OptionalKeys extends string = string,
  TParams extends Params<string, string> = Params<RequiredKeys, OptionalKeys>,
>() {
  const router = useTaroRouter<TParams>()

  return useMemo(() => {
    const params = Object.entries(router.params).reduce((memo, [key, val]) => {
      memo[key] = val ? decodeURIComponent(val) : val
      return memo
    }, {}) as TParams

    return {
      ...router,
      params: Object.assign(params, { utm: UTM.parse(params) }),
    }
  }, [router])
}

export function useRouterParams<RequiredKeys extends string = string, OptionalKeys extends string = string>() {
  const { params } = useRouter<RequiredKeys, OptionalKeys>()
  return params
}
