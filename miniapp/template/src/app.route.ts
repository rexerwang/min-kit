import { defineRouteConfig } from '@min-kit/helper/runtime'

const { Pages, Routes } = defineRouteConfig({
  Home: 'pages/index/index',

  PkgDemo: {
    Home: 'pages/index/index',
    H5: 'pages/h5/index',
    Modal: 'pages/modal/index',
    Toast: 'pages/toast/index',
    Request: 'pages/request/index',
    Share: 'pages/share/index',
    Scene: 'pages/scene/index',
  },
})

export { Pages, Routes }
