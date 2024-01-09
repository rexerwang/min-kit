import merge from 'webpack-merge'

import { argv } from './shared'
import { UserConfigService } from './UserConfigService'

import type { UserConfigFn } from '@tarojs/cli'
import type { IProjectConfig } from '@tarojs/taro/types/compile'

type ConfigFn = (...args: Parameters<UserConfigFn>) => IProjectConfig

type IOptions = {
  ci?: boolean
  tailwindcss?: boolean
  imageMinimizer?: boolean
}

function defineUserConfig(fn: ConfigFn, options: IOptions = {}) {
  const configService = new UserConfigService(argv.mode, process.env.TARO_ENV)
  configService.start()

  const plugins: any[] = [
    options.ci && ['@tarojs/plugin-mini-ci', configService.ci],
    argv.command === 'prebuild' && [
      require.resolve('@min-kit/helper/compile/taro-plugin-prebuild'),
      { config: configService.project },
    ],
  ].filter(Boolean)

  const baseConfig = fn(merge as any, {
    command: argv.command,
    mode: argv.mode,
  }) as IProjectConfig
  const userConfig: IProjectConfig = {
    plugins,
    defineConstants: configService.defineConstants,
    mini: {
      webpackChain(chain, ...args) {
        baseConfig.mini?.webpackChain?.(chain, ...args)

        chain
          .when(!!options.tailwindcss, (config) => {
            const { UnifiedWebpackPluginV5 } = require('weapp-tailwindcss/webpack')
            config.plugin('weapp-tailwindcss').use(UnifiedWebpackPluginV5, [{ appType: 'taro' }])
          })
          .when(argv.command === 'build' && !argv.watch && argv.analyzer, (config) => {
            const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
            config.plugin('analyzer').use(BundleAnalyzerPlugin)
          })
          .when(!!options.imageMinimizer, (config) => {
            const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

            config.optimization
              .minimizer('svgo')
              .use(ImageMinimizerPlugin, [
                {
                  minimizer: {
                    implementation: ImageMinimizerPlugin.svgoMinify,
                    options: {
                      encodeOptions: {
                        // Pass over SVGs multiple times to ensure all optimizations are applied. False by default
                        multipass: true,
                        plugins: [
                          // set of built-in plugins enabled by default
                          // see: https://github.com/svg/svgo#default-preset
                          'preset-default',
                        ],
                      },
                    },
                  },
                },
              ])
              .end()
              .minimizer('sharp')
              .use(ImageMinimizerPlugin, [
                {
                  minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    options: {
                      encodeOptions: {
                        // https://sharp.pixelplumbing.com/api-output#jpeg
                        jpeg: { quality: 90 },
                        // https://sharp.pixelplumbing.com/api-output#png
                        png: {},
                      },
                    },
                  },
                },
              ])
          })
      },
    },
  }

  return merge({}, baseConfig, userConfig)
}

export { defineUserConfig, type IProjectConfig }
