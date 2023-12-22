import { Icon } from '@min-kit/components'
import { logger } from '@min-kit/extends'

const r = require.context('./assets/icons', false, /\.(svg|png|jpg)$/, 'sync')

const icons = r.keys().reduce(
  (cache, key) => {
    // ./abc.svg
    const name = key.slice(2).replace(/\.(svg|png|jpg)$/, '')
    cache[name] = r(key)

    return cache
  },
  {} as Record<string, string>,
)

logger.debug('#icons', icons)

Icon.load(icons)
