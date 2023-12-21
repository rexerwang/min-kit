import { UserDefinedOptions } from 'postcss-rem-to-responsive-pixel'
import { Config } from 'tailwindcss'

import tailwindConfig from './tailwind.config'

interface PluginOpts {
  tailwind?: Config | true
  remToResponsivePixel?: UserDefinedOptions
}

export default function postcss(configs?: PluginOpts) {
  const tailwindOpts = configs?.tailwind === true ? tailwindConfig : configs?.tailwind
  const remToResponsivePixelOpts = configs?.remToResponsivePixel ?? {
    rootValue: 32,
    propList: ['*'],
    transformUnit: 'rpx',
  }

  return {
    plugins: [
      require('autoprefixer'),
      require('tailwindcss')(tailwindOpts),
      require('postcss-rem-to-responsive-pixel')(remToResponsivePixelOpts),
    ],
  }
}
