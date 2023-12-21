import { Icon } from '@miniapp/components'
import { logger } from '@miniapp/extends'

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
