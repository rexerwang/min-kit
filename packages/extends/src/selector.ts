import { createSelectorQuery } from '@tarojs/taro'

export function selectNodeContext<T>(id: string) {
  return new Promise<T>((resolve, reject) => {
    try {
      createSelectorQuery()
        .select('#' + id)
        .node()
        .exec(([res]) => {
          if (res?.node) resolve(res.node as T)
          else reject(res)
        })
    } catch (error) {
      reject(error)
    }
  })
}
