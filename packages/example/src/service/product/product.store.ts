import { logger } from '@min-kit/extends'
import { createStore, select } from '@min-kit/store'

import { getProducts } from './product.service'

import type { IProduct } from './product.type'

interface IState {
  list: IProduct[]
  current: IProduct | undefined
}

const initialState: IState = {
  list: [],
  current: undefined,
}

const store = createStore(initialState, (set) => ({
  async getList() {
    try {
      const list = await getProducts()
      set((state) => {
        state.list = list
        state.current = list[0]
      })
    } catch (error) {
      logger.error(error)
      set((state) => {
        state.list = []
        state.current = undefined
      })
    }
  },
}))

export const productStore = select(store, {
  apis: {
    getList: store.getState().getList,
  },
})
