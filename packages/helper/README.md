# @min-kit/helper · ![npm](https://img.shields.io/npm/v/%40min-kit/helper)

plugin and config helper for Taro

## Features

### Enhance compilation:

Fist, add `config/mode` & `config/platform` configs. For example:

- [miniapp/template/config/mode](https://github.com/rexerwang/min-kit/tree/main/miniapp/template/config/mode)
- [miniapp/template/config/platform](https://github.com/rexerwang/min-kit/tree/main/miniapp/template/config/platform)

Then, replace `defineConfig` with `defineUserConfig` in `config/index.ts`:

```ts
// config/index.ts

import { defineUserConfig } from '@min-kit/helper/compile'

import devConfig from './dev'
import prodConfig from './prod'

export default defineUserConfig(
  (merge, { command, mode }) => {
    const baseConfig = {
      // your configs
    }

    if (process.env.NODE_ENV === 'development') {
      // 本地开发构建配置（不混淆压缩）
      return merge({}, baseConfig, devConfig)
    }
    // 生产构建配置（默认开启压缩混淆等）
    return merge({}, baseConfig, prodConfig)
  },
  // the default options:
  {
    tailwindcss: true,
    imageMinimizer: true,
    analyzer: true,
    ci: true,
  },
)
```

It will integrate the following plugins as default:

- `tailwindcss` by [weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss)  
   with config extends:

  ```js
  // tailwind.config.js
  module.exports = {
    presets: [require('@min-kit/helper/config').tailwind],
  }

  // postcss.config.js
  module.exports = require('@min-kit/helper/config').postcss()
  ```

- image minimizer by [image-minimizer-webpack-plugin](https://github.com/webpack-contrib/image-minimizer-webpack-plugin) with `svgo` & `sharp`
- bundle analyzer by [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)  
  enable by `taro build --analyzer`
- `ci` by [@tarojs/plugin-mini-ci](https://www.npmjs.com/package/@tarojs/plugin-mini-ci). (need install if it enabled)

### Enhance app configs:

- define app route

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

- define app config

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

go [here](https://github.com/rexerwang/min-kit/tree/main/miniapp/template) for more usage examples.
