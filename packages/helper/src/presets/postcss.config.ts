import { tailwind } from './tailwind.config'

import type { AcceptedPlugin } from 'postcss'
import type { UserDefinedOptions } from 'postcss-rem-to-responsive-pixel'
import type { Config } from 'tailwindcss'

interface PluginOpts {
  autoprefixer?: boolean
  tailwindcss?: Config | boolean
  'postcss-rem-to-responsive-pixel'?: UserDefinedOptions | boolean
}

/**
 * setup postcss plugins for miniapp
 */
export function postcss(opts: PluginOpts = {}) {
  const plugins: AcceptedPlugin[] = []

  if (opts.autoprefixer !== false) {
    plugins.push(require('autoprefixer'))
  }

  if (opts.tailwindcss !== false) {
    const option = opts.tailwindcss === true ? tailwind : opts.tailwindcss
    plugins.push(require('tailwindcss')(option))
  }

  if (opts['postcss-rem-to-responsive-pixel'] !== false) {
    let option = opts['postcss-rem-to-responsive-pixel']
    if (!option || option === true) option = { rootValue: 32, propList: ['*'], transformUnit: 'rpx' }
    plugins.push(require('postcss-rem-to-responsive-pixel')(option))
  }

  return { plugins }
}
