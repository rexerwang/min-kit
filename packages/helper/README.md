# @min-kit/helper

[![](https://img.shields.io/codecov/c/github/rexerwang/min-kit?style=for-the-badge)](https://codecov.io/gh/rexerwang/min-kit)
[![](https://img.shields.io/npm/types/%40min-kit/helper?style=for-the-badge)](https://github.com/rexerwang/min-kit/tree/main/packages/helper)
[![](https://img.shields.io/npm/v/%40min-kit/helper?style=for-the-badge)](https://npm.im/@min-kit/helper)
[![](https://img.shields.io/badge/React-Tarojs-007ACC?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=20232A)](https://github.com/NervJS/taro)

Plugins & configs of Tarojs for miniapp

## Features

### 🚀 Enhance compilation

⓵ First, add `config/mode` & `config/platform` configs. For example:

- [packages/example/config/mode](https://github.com/rexerwang/min-kit/tree/main/packages/example/config/mode)
- [packages/example/config/platform](https://github.com/rexerwang/min-kit/tree/main/packages/example/config/platform)

⓶ Then, replace `defineConfig` with `defineUserConfig` in `config/index.ts`:

```ts
// config/index.ts

import { defineUserConfig } from '@min-kit/helper/compile'

import devConfig from './dev'
import prodConfig from './prod'

export default defineUserConfig((merge, { command, mode }) => {
  const baseConfig = {
    // your configs
  }

  if (process.env.NODE_ENV === 'development') {
    return merge({}, baseConfig, devConfig)
  }

  return merge({}, baseConfig, prodConfig)
})
```

⓷ Enable to integrate plugins with configs:

```js
defineUserConfig(() => your_config, {
  ci: true, // enable ci plugin
  tailwindcss: true, // enable tailwindcss
  imageMinimizer: true, // enable image minimizer
})
```

- `ci` by [@tarojs/plugin-mini-ci](https://www.npmjs.com/package/@tarojs/plugin-mini-ci)

  - need to install deps:
    ```sh
    pnpm add -D @tarojs/plugin-mini-ci
    ```

- `tailwindcss` by [weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss)

  - need to install deps:
    ```sh
    pnpm add -D postcss tailwindcss
    ```
  - with config extends:

  ```js
  // tailwind.config.js
  module.exports = {
    presets: [require('@min-kit/helper/config').tailwind],
  }

  // postcss.config.js
  module.exports = require('@min-kit/helper/config').postcss()
  ```

- `image-minimizer` by [image-minimizer-webpack-plugin](https://www.npmjs.com/package/image-minimizer-webpack-plugin)

  - optimize SVG with [svgo](https://www.npmjs.com/package/svgo)
  - optimize JPEG, PNG, WebP, GIF and AVIF images with [sharp](https://www.npmjs.com/package/sharp)

- `bundle-analyzer` by [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

  - with command to enable:
    ```sh
    pnpm taro build --analyzer
    ```

### 🚀 Enhance configs

#### ✅ define app.route by `defineRouteConfig`

```ts
// src/app.route.ts

import { defineRouteConfig } from '@min-kit/helper/runtime'

const { Pages, Routes } = defineRouteConfig({
  Home: 'pages/index/index',

  PkgDemo: {
    Home: 'pages/index/index',
  },
})

export { Pages, Routes }
```

#### ✅ define app.config by `configChain`

```ts
// src/app.config.ts

import { configChain } from '@min-kit/helper/runtime'
import { isString } from '@min-kit/shared'

import { Routes } from './app.route'

export default configChain((chain, { mode }) => {
  const isDev = mode === 'dev'

  chain
    .entryPagePath(Routes.Home)
    .pages(Object.values(Routes).filter(isString))
    .subPackage('pkg-demo')
    .when(isDev)
    .pages(Object.values(Routes.PkgDemo))
    .end()
    .window({
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: 'WeChat',
    })
    .wechat.debug(isDev)
})
```

### 🚀 Taro shims in `d.ts`

```ts
// types/global.d.ts

/// <reference types="@min-kit/helper" />

// declare your build mode. its related to `config/mode` 👆
declare type Mode = 'dev' | 'prod'

// declare your defined constants. its related to `config/mode` 👆
declare type DefineConstants = {}
```

More usage examples 👉 https://github.com/rexerwang/min-kit/tree/main/packages/example
