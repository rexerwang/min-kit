export const UsageSnippet = `import { createPersistStore, select } from '@min-kit/store'
import { Button, View } from '@tarojs/components'

const store = select(
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
