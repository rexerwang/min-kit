import { SystemInfo } from '@miniapp/extends'
import { createPersistStore } from '@miniapp/store'
import { useMemo } from 'react'

import type { AnyObject } from '../../types'

export interface RequestRecord {
  reqId: string
  url: string
  method: string
  requestStart: number
  responseEnd?: number
  statusCode?: number
  response?: {
    header?: AnyObject
    data?: any
    cookies?: string[]
  }
  request: {
    header: AnyObject
    data?: AnyObject
    query?: AnyObject
  }
  /**
   * 网络请求过程中一些调试信息
   * https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html#Object-object
   */
  profile?: AnyObject
}

interface IState {
  position: { x: number; y: number }
  tab: number

  requestRecords: RequestRecord[]
}

const initialState: IState = {
  position: {
    x: SystemInfo.screenWidth,
    y: SystemInfo.screenHeight,
  },
  tab: 0,

  requestRecords: [],
}

const MAX_SIZE = 1000

const store = createPersistStore(
  'debugger',
  initialState,
  (set) => ({
    setPosition(position: IState['position']) {
      set({ position })
    },
    setTab(tab: number) {
      set({ tab })
    },
    insertRequest(record: RequestRecord) {
      set((state) => {
        state.requestRecords.push(record)
        if (state.requestRecords.length === MAX_SIZE) {
          state.requestRecords.shift()
        }
      })
    },
    updateRequest(payload: Partial<RequestRecord>) {
      set((state) => {
        const index = state.requestRecords.findIndex((i) => i.reqId === payload.reqId)

        if (index > -1) {
          const records = state.requestRecords[index]
          state.requestRecords.splice(index, 1, Object.assign({}, records, payload))
        }
      })
    },
    clearRequest() {
      set((state) => {
        state.requestRecords = []
      })
    },
  }),
  { partialize: ({ position, tab }) => ({ position, tab }) },
)

export const uiStore = {
  position: () => store((v) => v.position),
  setPosition: store.getState().setPosition,
  tab: () => store((v) => v.tab),
  setTab: store.getState().setTab,
}

export const requestStore = {
  insert: store.getState().insertRequest,
  update: store.getState().updateRequest,
  clear: store.getState().clearRequest,
  useRecords(filter?: string) {
    const records = store((v) => v.requestRecords)
    return useMemo(() => {
      const length = records.length
      if (filter) return { length, records: records.filter(({ url }) => url.includes(filter)) }
      return { length, records }
    }, [filter, records])
  },
}
