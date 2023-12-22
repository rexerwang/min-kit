import { logger } from '@min-kit/extends'
import { combineStore, createPersistStore } from '@min-kit/store'
import { checkSession, login } from '@tarojs/taro'

import { signin } from '../service/auth'

interface IState {
  token: string | undefined
}

const initialState: IState = {
  token: undefined,
}

const store = createPersistStore('AuthStore', initialState, (set) => ({
  async login() {
    try {
      const { code } = await login()
      const token = await signin(code)
      set({ token })
    } catch (e) {
      set({ token: undefined })
      logger.error('#login', e)
      throw e
    }
  },
  logout() {
    set({ token: undefined })
  },
}))

const authStore = combineStore(store, {
  apis: {
    getToken: () => store.getState().token,
    login: store.getState().login,
    logout: store.getState().logout,
    /**
     * 检查登录态是否过期并重新登录
     *
     * @returns true: 未过期；false: 已过期且重新登录失败
     */
    checkSession: () =>
      checkSession()
        .catch(() => store.getState().login())
        .then(() => true)
        .catch(() => false),
  },
})

export default authStore
