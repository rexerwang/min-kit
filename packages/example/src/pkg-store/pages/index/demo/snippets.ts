export const UsageSnippet = `import { combineStore, createPersistStore } from '@min-kit/store'
import { Button, View } from '@tarojs/components'

const store = combineStore(
  createPersistStore('counter', { count: 1 }, (set) => ({
    increase() {
      set((state) => {
        state.count++
      })
    },
  })),
)

export function Counter() {
  const count = store.count()
  const increase = store.increase()

  return (
    <View>
      <View>{count}</View>
      <Button onClick={increase}>one up</Button>
    </View>
  )
}
`
