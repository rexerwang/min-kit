import { defineRouteConfig } from '@min-kit/helper/app'

const { Pages, Routes } = defineRouteConfig({
  Index: 'pages/index/index',
  H5: 'pages/h5/index',

  PkgComponents: {
    Index: 'pages/index/index',
    Modal: 'pages/modal/index',
    Share: 'pages/share/index',
    NavigationBar: 'pages/navigation-bar/index',
    Image: 'pages/image/index',
    Icon: 'pages/icon/index',
    Debugger: 'pages/debugger/index',
  },

  PkgExtends: {
    Index: 'pages/index/index',
    Request: 'pages/request/index',
    Logger: 'pages/logger/index',
    Toast: 'pages/toast/index',
    Scene: 'pages/scene/index',
  },

  PkgStore: {
    Index: 'pages/index/index',
  },
})

export { Pages, Routes }
