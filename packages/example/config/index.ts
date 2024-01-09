import path from 'node:path'

import { defineUserConfig, type IProjectConfig } from '@min-kit/helper/compile'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

import devConfig from './dev'
import prodConfig from './prod'

export default defineUserConfig(
  (merge) => {
    const baseConfig: IProjectConfig = {
      projectName: 'template',
      date: '2023-12-21',
      designWidth: 750,
      deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        375: 2,
        828: 1.81 / 2,
      },
      sourceRoot: 'src',
      outputRoot: 'dist',
      plugins: [],
      defineConstants: {},
      copy: {
        patterns: [],
        options: {},
      },
      framework: 'react',
      compiler: 'webpack5',
      cache: {
        enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
      },
      jsMinimizer: 'esbuild',
      esbuild: {
        minify: {
          enable: true,
          config: {
            // 配置项同 https://github.com/privatenumber/esbuild-loader#minifyplugin
            target: 'es2015', // target 默认值为 es5
          },
        },
      },
      mini: {
        postcss: {
          pxtransform: {
            enable: true,
            config: {},
          },
          url: {
            enable: true,
            config: {
              limit: 1024, // 设定转换尺寸上限
            },
          },
          cssModules: {
            enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
            config: {
              namingPattern: 'module', // 转换模式，取值为 global/module
              generateScopedName: '[name]__[local]___[hash:base64:5]',
            },
          },
        },
        webpackChain(chain) {
          chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)

          // replace RootPortal in @min-kit/components when tt
          chain.when(process.env.TARO_ENV === 'tt', (config) => {
            config.module
              .rule('compile')
              .test(/\.mjs$/)
              .include.add(path.dirname(require.resolve('@min-kit/components')))
              .end()
              .use('babel')
              .loader('babel-loader')
              .options({
                plugins: [['@min-kit/helper/compile/babel-plugin-replace-components', { RootPortal: 'View' }]],
              })
          })
        },
      },
      logger: {
        quiet: !!process.env.CI,
        stats: process.env.NODE_ENV === 'production',
      },
    }
    if (process.env.NODE_ENV === 'development') {
      // 本地开发构建配置（不混淆压缩）
      return merge({}, baseConfig, devConfig)
    }
    // 生产构建配置（默认开启压缩混淆等）
    return merge({}, baseConfig, prodConfig)
  },
  { ci: true, tailwindcss: true, imageMinimizer: true },
)
