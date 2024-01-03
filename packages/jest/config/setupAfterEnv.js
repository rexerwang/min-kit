require('./globals')
require('@testing-library/jest-dom')

const { default: actualApis } = require('@tarojs/taro')

const { supports, MenuButtonBoundingClientRect, SystemInfo, Current, AccountInfo } = require('./fixtures')

jest.doMock('@tarojs/taro', () => {
  const mockApis = {
    canIUse: (schema) => supports.includes(schema),
    getMenuButtonBoundingClientRect: () => MenuButtonBoundingClientRect,
    getSystemInfoSync: () => SystemInfo,
    getAccountInfoSync: () => AccountInfo,
    get Current() {
      return Current
    },
    getCurrentInstance: () => Current,
    getCurrentPages: () => [{ route: '', options: {} }],
    nextTick: (cb) => cb(),
  }

  return { ...actualApis, ...mockApis }
})

// disable console
console.debug = jest.fn()

afterEach(() => {
  jest.resetAllMocks()
})
