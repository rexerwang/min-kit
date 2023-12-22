import { logger, RequestError } from '@min-kit/extends'
import { HttpStatus } from '@min-kit/shared'
import { combineStore, createStore } from '@min-kit/store'

import { getProfile } from '../service/user'

export interface IUser {
  memberId: string
  unionId: string
  openId: string
  phoneNumber: string
  nickName: string
  avatarUrl: string
  gender: number
  birthday: string
}

interface IState {
  profile: IUser | undefined
}

const initialState: IState = {
  profile: undefined,
}

const store = createStore(initialState, (set) => ({
  async getProfile() {
    try {
      const profile = await getProfile()
      set((state) => {
        state.profile = { ...state.profile, ...profile }
      })
    } catch (error) {
      set({ profile: undefined })

      const e: RequestError = error
      if (e.ctx.statusCode !== HttpStatus.UNAUTHORIZED) {
        logger.error('#getProfile', e)
      }

      throw error
    }
  },
}))

const userStore = combineStore(store, {
  apis: {
    getProfile: store.getState().getProfile,
  },
})

export default userStore
