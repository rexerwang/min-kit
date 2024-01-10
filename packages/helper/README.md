# @min-kit/helper

[![](https://img.shields.io/codecov/c/github/rexerwang/min-kit?flag=helper&style=for-the-badge)](https://codecov.io/gh/rexerwang/min-kit/flags)
[![](https://img.shields.io/npm/types/%40min-kit/helper?style=for-the-badge)](https://github.com/rexerwang/min-kit/tree/main/packages/helper)
[![](https://img.shields.io/npm/v/%40min-kit/helper?style=for-the-badge)](https://npm.im/@min-kit/helper)
[![](https://img.shields.io/badge/React-Tarojs-007ACC?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=20232A)](https://github.com/NervJS/taro)

Plugins & configs of Tarojs for miniapp

## Features

### 🚀 Enhance compilation configs

`defineUserConfig` enhances Taro's build configuration for multiple platforms and environments.
It also integrates popular third-party plugins.

The multi-environment config files are defined in the `config/mode` dir  
The multi-platform config files are defined in the `config/platform` dir

Before compiling, execute `taro prebuild` command to generate the corresponding platform config files (such as `project.config.json`). At the same time, define the environment configuration (such as DefineConstants).

<details>

<summary>Usage of <code>taro prebuild</code> command</summary>

```sh
# generate configs for weapp platform in dev environment
pnpm taro prebuild --type weapp --mode dev
# compile weapp platform in dev environment
pnpm taro build --type weapp --mode dev

# generate configs for alipay platform in prod environment
pnpm taro prebuild --type alipay --mode prod
# compile alipay platform in prod environment
pnpm taro build --type alipay --mode prod
```

</details>

#### 🟢 Steps to use `defineUserConfig`

⓵ First, add `config/mode` & `config/platform` config files. For example:

- [packages/example/config/mode](https://github.com/rexerwang/min-kit/tree/main/packages/example/config/mode)
- [packages/example/config/platform](https://github.com/rexerwang/min-kit/tree/main/packages/example/config/platform)

⓶ Then, replace `defineConfig` with `defineUserConfig` in `config/index.ts`:

```ts
// config/index.ts

import { defineUserConfig, IProjectConfig } from '@min-kit/helper/taro'

import devConfig from './dev'
import prodConfig from './prod'

export default defineUserConfig((merge, { command, mode }) => {
  const baseConfig: IProjectConfig = {
    // your configs
  }

  if (process.env.NODE_ENV === 'development') {
    return merge({}, baseConfig, devConfig)
  }

  return merge({}, baseConfig, prodConfig)
})
```

⓷ Enable the integration of third-party plugins via the options of `defineUserConfig`:

```js
defineUserConfig(() => your_config, {
  ci: true, // enable ci plugin
  tailwindcss: true, // enable tailwindcss plugin
  imageMinimizer: true, // enable image minimizer plugin
})
```

<details>
<summary>Setup third-party plugins</summary>

- `ci` by [@tarojs/plugin-mini-ci](https://www.npmjs.com/package/@tarojs/plugin-mini-ci)

  - need to install deps:
    ```sh
    pnpm add -D @tarojs/plugin-mini-ci
    ```
  - the plugin options need to be defined in `config/platform`

- `tailwindcss` by [weapp-tailwindcss](https://www.npmjs.com/package/weapp-tailwindcss)

  - need to install deps:
    ```sh
    pnpm add -D postcss tailwindcss
    ```
  - with config presets:
    ```js
    // tailwind.config.js
    module.exports = {
      presets: [require('@min-kit/helper/presets').tailwind],
      // your configs
    }
    // postcss.config.js
    module.exports = require('@min-kit/helper/presets').postcss()
    ```

- `image-minimizer` by [image-minimizer-webpack-plugin](https://www.npmjs.com/package/image-minimizer-webpack-plugin)

  - optimize SVG with [svgo](https://www.npmjs.com/package/svgo)
  - optimize JPEG, PNG, WebP, GIF and AVIF images with [sharp](https://www.npmjs.com/package/sharp)

- `bundle-analyzer` by [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

  - with command to enable:
    ```sh
    pnpm taro build --analyzer
    ```

</details>

### 🚀 Enhance app configs

#### 🟢 Define app.route with `defineRouteConfig`

```ts
// src/app.route.ts

import { defineRouteConfig } from '@min-kit/helper/app'

const { Pages, Routes } = defineRouteConfig({
  Home: 'pages/index/index',

  PkgDemo: {
    Home: 'pages/index/index',
  },
})

export { Pages, Routes }
```

#### 🟢 Define app.config with `defineAppConfigChain`

```ts
// src/app.config.ts

import { defineAppConfigChain } from '@min-kit/helper/app'
import { isString } from '@min-kit/shared'

import { Routes } from './app.route'

export default defineAppConfigChain((chain, { env }) => {
  chain
    .entryPagePath(Routes.Home)
    .pages(Object.values(Routes).filter(isString))
    .subPackage('pkg-demo')
    .pages(Object.values(Routes.PkgDemo))
    .end()
    .window({
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: 'WeChat',
    })
    .wechat.debug(env === 'development')
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
