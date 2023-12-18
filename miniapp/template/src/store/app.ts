import { combineStore, createPersistStore } from '@miniapp/store'

interface IState {
  name: string
  author: string
  version: string
  lastSignedIn: { at: number; scene: number } | undefined
}

const initialState: IState = {
  name: '@miniapp/template',
  author: 'rexerwang',
  version: '1.0.0',
  lastSignedIn: undefined,
}

// TODO: fix typings
const store = createPersistStore('appStore', initialState, (set: any) => ({
  lastSignIn(at: number, scene: number) {
    set((state) => {
      state.lastSignedIn = { at, scene }
    })
  },
}))

const appStore = combineStore(store, {
  apis: {
    lastSignIn: store.getState().lastSignIn,
  },
})

export default appStore
