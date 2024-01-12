import { createPersistStore, select } from '@min-kit/store'
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
    <View className='w-40 p-4 text-center text-white bg-[#3c4a51] rounded-lg'>
      <View className='my-2 text-[96px]'>{count}</View>
      <Button className='btn py-1 px-4 text-white bg-transparent border-solid border-4 rounded-lg' onClick={increase}>
        one up
      </Button>
    </View>
  )
}
